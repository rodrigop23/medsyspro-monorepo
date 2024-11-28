import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../domain/repositories/chat.repository';
import { Message } from '../../domain/entities/message.entity';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  getChats(userId: number) {
    return this.chatRepository.findByUser(userId);
  }

  sendMessage(chatId: number, message: Message) {

  }

  createChat(doctorId: number, patientId: number) {
    return this.chatRepository.createChat(doctorId, patientId);
  }
}
