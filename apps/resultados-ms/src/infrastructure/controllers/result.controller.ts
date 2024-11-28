import { Controller, Get, Param } from "@nestjs/common";
import { GetResultsUseCase } from "src/application/use-cases/get-results.use-case";
import { DownloadResultsUseCase } from "src/application/use-cases/download-results.use-case";

@Controller('results')
export class ResultController {
  constructor(
    private readonly getResultsUseCase: GetResultsUseCase,
    private readonly downloadResultsUseCase: DownloadResultsUseCase,
  ) {}

  @Get('patient/:id')
  async getResults(@Param('id') patientId: string) {
    return await this.getResultsUseCase.execute(patientId);
  }

  @Get(':id/download')
  async downloadResult(@Param('id') resultId: string) {
    return await this.downloadResultsUseCase.execute(resultId);
  }
}
