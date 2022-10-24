import { Logger } from '@nestjs/common';
import {
  GatewayMetadata,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
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

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, gameId: string): void {
    console.log('join room', gameId);
    client.join(gameId);
  }

  @SubscribeMessage('gameUpdate')
  handleGameUpdate(client: Socket, pgn: string): void {
    console.log(client);
    client.broadcast.emit('gameUpdate', pgn);
  }
}
