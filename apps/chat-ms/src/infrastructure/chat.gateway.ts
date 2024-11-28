import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('sendMessage')
    handleMessage(
      @MessageBody() message: { sender: string; content: string },
      @ConnectedSocket() client: Socket,
    ): void {
      console.log(`Message received from ${message.sender}: ${message.content}`);
      client.broadcast.emit('receiveMessage', message);
    }
  }
  