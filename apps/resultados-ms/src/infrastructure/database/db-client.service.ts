import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@repo/result-db-prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this['$connect']();

    console.log('Prisma conectado con la base de datos.');
  }

  async onModuleDestroy() {
    await this['$disconnect']();

    console.log('Prisma desconectado.');
  }
}
