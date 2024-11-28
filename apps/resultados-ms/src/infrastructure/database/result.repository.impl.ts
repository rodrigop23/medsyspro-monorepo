import { ResultRepository } from "src/domain/repositories/result.repository";
import { Result } from "src/domain/entities/result.entity";
import {PrismaService} from './prisma.service';


export class ResultRepositoryImpl implements ResultRepository {
    constructor(private readonly prisma: PrismaService) {}
  
    async findResultsByPatient(patientId: string): Promise<Result[]> {
      const results = await this.prisma.result.findMany({
        where: { patientId },
      });
      return results.map(
        (r) => new Result(r.id, r.patientId, r.type, r.filePath, r.createdAt),
      );
    }
  
    async downloadResult(id: string): Promise<Result> {
      const result = await this.prisma.result.findUniqueOrThrow({ where: { id } });
      return new Result(result.id, result.patientId, result.type, result.filePath, result.createdAt);
    }
  }
  