import { Result } from "../entities/result.entity";

export interface ResultRepository {
    findResultsByPatient(patientId: string): Promise<Result[]>;
    downloadResult(id: string): Promise<Result>;
    create(data: Partial<Result>): Promise<Result>;

  }
  