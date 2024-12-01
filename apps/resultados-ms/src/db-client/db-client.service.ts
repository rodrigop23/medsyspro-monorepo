import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@repo/result-db-prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this['$connect']();
  }
}
