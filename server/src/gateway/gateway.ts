import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { Server } from 'ws';

@WebSocketGateway()
export class Gateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  logger: Logger = new Logger('wsGateway');

  onModuleInit() {
    this.logger.log('Gateway initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(client);
    this.logger.log('handleConnection');
  }

  handleDisconnect(client: any) {
    this.logger.log(client);
    this.logger.log('handleDisconnection');
  }

  @SubscribeMessage('gameEvent')
  onGameEvent(@MessageBody() body: any) {}

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.logger.log(body);
    this.server.emit('onMessage', { msg: 'blah i do not know' });
  }
}
