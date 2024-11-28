import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/db-client/db-client.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(createAuthDto: CreateAuthDto) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: createAuthDto.email,
        },
      });

      console.log(userExists);

      if (userExists) {
        return {
          duplicated: true,
          message: 'El usuario ya existe',
        };
      }

      const hashedPassword = bcrypt.hashSync(createAuthDto.password, 10);

      createAuthDto.password = hashedPassword;

      await this.prisma.user.create({
        data: {
          ...createAuthDto,
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
}
