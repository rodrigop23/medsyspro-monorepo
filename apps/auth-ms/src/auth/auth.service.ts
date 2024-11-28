import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/db-client/db-client.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
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

      await this.prisma.user.create({
        data: {
          ...createUserDto,
        },
      });

      return {
        ok: true,
        message: 'Usuario creado con éxito',
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

      return {
        ok: true,
        message: 'Inicio de sesión exitoso',
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }
}
