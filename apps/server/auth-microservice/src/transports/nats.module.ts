import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE', // TODO: cambiar a const
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVER,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE', // TODO: cambiar a const
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVER,
        },
      },
    ]),
  ],
})
export class NatsModule {}
