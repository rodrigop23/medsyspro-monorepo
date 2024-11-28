import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
  ) {}

  findByUser(userId: number) {
    return this.chatRepo.find({
      where: [{ doctor: { id: userId } }, { patient: { id: userId } }],
      relations: ['messages'],
    });
  }

  createChat(doctorId: number, patientId: number) {
    const chat = this.chatRepo.create({ doctor: { id: doctorId }, patient: { id: patientId } });
    return this.chatRepo.save(chat);
  }
}
