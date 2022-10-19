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
    origin: ['http://localhost:3000'],
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

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: text };
  }
}
