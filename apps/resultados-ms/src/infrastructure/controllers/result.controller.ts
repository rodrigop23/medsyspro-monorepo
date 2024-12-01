import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GetResultsUseCase } from 'src/application/use-cases/get-results.use-case';
import { DownloadResultsUseCase } from 'src/application/use-cases/download-results.use-case';
import { CreateResultUseCase } from 'src/application/use-cases/create-results.use-case';
import { Result } from 'src/domain/entities/result.entity';

@Controller('results')
export class ResultController {
  constructor(
    private readonly getResultsUseCase: GetResultsUseCase,
    private readonly downloadResultsUseCase: DownloadResultsUseCase,
    private readonly createResultUseCase: CreateResultUseCase,
  ) {}

  @Get('patient/:id')
  async getResults(@Param('id') patientId: string) {
    return await this.getResultsUseCase.execute(patientId);
  }

  @Get(':id/download')
  async downloadResult(@Param('id') resultId: string) {
    return await this.downloadResultsUseCase.execute(resultId);
  }

  @Post()
  async create(@Body() body: any) {
    // Validación manual de los datos
    if (
      !body.patientId ||
      !body.type ||
      !body.filePath ||
      !body.nombre ||
      !body.descripcion
    ) {
      throw new Error('Todos los campos son requeridos');
    }

    // Crear la entidad `Result` con los datos proporcionados
    const newResult = new Result(
      '', // El ID será generado automáticamente en el repositorio
      body.patientId,
      body.type,
      body.filePath,
      body.nombre,
      body.descripcion,
      new Date(), // Fecha de creación asignada automáticamente
    );

    // Llamar al caso de uso
    return await this.createResultUseCase.execute(newResult);
  }
}
