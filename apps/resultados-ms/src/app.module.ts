import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultController } from './infrastructure/controllers/result.controller';
import { PrismaService } from './infrastructure/database/db-client.service';
import { ResultRepositoryImpl } from './infrastructure/database/result.repository.impl';
import { CreateResultUseCase } from './application/use-cases/create-results.use-case';
import { GetResultsUseCase } from './application/use-cases/get-results.use-case';
import { DownloadResultsUseCase } from './application/use-cases/download-results.use-case';

@Module({
  imports: [],
  controllers: [ResultController],
  providers: [
    PrismaService, // Servicio de Prisma
    {
      provide: ResultRepositoryImpl,
      useFactory: (prisma: PrismaService) => new ResultRepositoryImpl(prisma),
      inject: [PrismaService], // Inyección manual
    },
    {
      provide: CreateResultUseCase,
      useFactory: (repository: ResultRepositoryImpl) => new CreateResultUseCase(repository),
      inject: [ResultRepositoryImpl],
    },
    {
      provide: GetResultsUseCase,
      useFactory: (repository: ResultRepositoryImpl) => new GetResultsUseCase(repository),
      inject: [ResultRepositoryImpl],
    },
    {
      provide: DownloadResultsUseCase,
      useFactory: (repository: ResultRepositoryImpl) => new DownloadResultsUseCase(repository),
      inject: [ResultRepositoryImpl],
    },
  ],
})
export class AppModule {}
