import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/db-client/db-client.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

import { Session, User } from '@repo/user-db-prisma';
import * as thirtyTwo from 'thirty-two';
import { createHash, randomBytes } from 'crypto';

type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      console.log(userExists);

      if (userExists) {
        return {
          duplicated: true,
          message: 'El usuario ya existe',
        };
      }

      const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

      createUserDto.password = hashedPassword;

      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
        },
      });

      const { token, session } = await this.generateSession(newUser.id);

      return {
        ok: true,
        message: 'Usuario creado con éxito',
        session,
        token,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: loginUserDto.email,
        },
      });

      if (!user) {
        return {
          email: true,
          message: 'Usuario no encontrado',
        };
      }

      const passwordMatch = bcrypt.compareSync(
        loginUserDto.password,
        user.password,
      );

      if (!passwordMatch) {
        return {
          password: true,
          message: 'Contraseña incorrecta',
        };
      }

      const { token, session } = await this.generateSession(user.id);

      return {
        ok: true,
        message: 'Inicio de sesión exitoso',
        session,
        token,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async generateSession(userId: number) {
    const token = await this.generateSessionToken();
    const session = await this.createSession(token, userId);

    return { token, session };
  }

  async generateSessionToken(): Promise<string> {
    const bytes = randomBytes(20);

    const token = thirtyTwo
      .encode(bytes)
      .toString()
      .replace(/=/g, '')
      .toLowerCase();

    return token;
  }

  async createSession(token: string, userId: number): Promise<Session> {
    const sessionId = createHash('sha256').update(token).digest('hex');

    const session: Session = {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };

    await this.prisma.session.create({
      data: session,
    });

    return session;
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = createHash('sha256').update(token).digest('hex');

    const result = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });

    if (result === null) {
      return { session: null, user: null };
    }

    const { user, ...session } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
      await this.prisma.session.delete({ where: { id: sessionId } });
      return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await this.prisma.session.update({
        where: {
          id: session.id,
        },
        data: {
          expiresAt: session.expiresAt,
        },
      });
    }

    return { session, user };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.prisma.session.delete({ where: { id: sessionId } });
  }
}
