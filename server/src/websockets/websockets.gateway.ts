import { Logger } from '@nestjs/common';
import {
  GatewayMetadata,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const options: GatewayMetadata = {
  cors: {
    origin: '*',
  },
};

@WebSocketGateway(options)
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('WebsocketsGateway');

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connection ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnect ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log(`initialized`);
  }

  @SubscribeMessage('gameUpdate')
  handleMessage(client: Socket, pgn: string): WsResponse<string> {
    console.log(client);
    client.broadcast.emit('gameUpdate', pgn);
    return { event: 'gameUpdate', data: pgn };
  }
}
