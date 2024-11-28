import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import {PrismaClient} 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Se ejecuta cuando el módulo se inicializa
    await this.$connect();
    console.log('Prisma conectado con la base de datos.');
  }

  async onModuleDestroy() {
    // Se ejecuta cuando el módulo se destruye
    await this.$disconnect();
    console.log('Prisma desconectado.');
  }
}
