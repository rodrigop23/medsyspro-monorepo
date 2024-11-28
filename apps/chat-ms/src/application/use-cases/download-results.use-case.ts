import { ResultRepository } from "src/domain/repositories/result.repository";

export class DownloadResultsUseCase {
    constructor(private readonly resultRepository: ResultRepository) {}
  
    async execute(resultId: string) {
      return await this.resultRepository.downloadResult(resultId);
    }
  }
  
