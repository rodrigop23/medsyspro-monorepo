import { ResultRepository } from 'src/domain/repositories/result.repository';

export class GetResultsUseCase {
  constructor(private readonly resultRepository: ResultRepository) {}

  async execute(patientId: string) {
    return await this.resultRepository.findResultsByPatient(patientId);
  }
}
