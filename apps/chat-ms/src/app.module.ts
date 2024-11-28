import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Chat } from '../domain/entities/chat.entity';
import { User } from '../domain/entities/user.entity';
import { Message } from '../domain/entities/message.entity';
import { ChatGateway } from '../infrastructure/chat.gateway';
import { ChatController } from './app.controller';
import { ChatService } from '../application/use-cases/chat.service';
import { ChatRepository } from '../domain/repositories/chat.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ChatService, ChatRepository, ChatGateway],
})
export class AppModule {}
