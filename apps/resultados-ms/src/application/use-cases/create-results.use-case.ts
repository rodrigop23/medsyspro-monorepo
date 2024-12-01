import { identity } from 'rxjs';
import { Result } from 'src/domain/entities/result.entity';
import { ResultRepository } from 'src/domain/repositories/result.repository';

export class CreateResultUseCase {
  constructor(private readonly repository: ResultRepository) {}

  async execute(result: Result): Promise<Result> {
    // Generar ID automáticamente (o delegar esto al repositorio si lo prefieres)
    result.id = this.generateId();

    // Llamar al repositorio para guardar el resultado
    return await this.repository.create(result);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Ejemplo de generación simple de ID
  }
}
