import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { Game, GameDocument } from 'src/schemas/game.schema';

@WebSocketGateway({ cors: true })
export class Gateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  @WebSocketServer()
  server: Server;
  logger: Logger = new Logger('wsGateway');

  onModuleInit() {
    this.logger.log('Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(client.id);
    this.logger.log('handleConnection');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id);
    this.logger.log('handleDisconnection');
  }

  @SubscribeMessage('joinGame')
  async onJoinGame(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { gameId } = body;
    this.logger.log('join game ', gameId, client.id);
    let game = await this.gameModel.findOne({ gameId });
    if (!game) {
      game = new this.gameModel({
        gameId,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      });
    }

    client.join(gameId);
    this.server.to(client.id).emit('gameEvent', game.toJSON());
    await game.save();
  }

  @SubscribeMessage('leaveGame')
  onLeaveGame(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { gameId } = body;
    this.logger.log('leave game ', gameId, client.id);
    client.leave(gameId);
  }

  @SubscribeMessage('gameUpdate')
  async onGameEvent(@MessageBody() body: any) {
    const { gameId } = body;
    this.server.in(gameId).emit('gameEvent', body);
    let game = await this.gameModel.findOne({ gameId });
    if (!game) {
      game = new this.gameModel({
        ...body,
      });
    }
    await game.save();
  }
}
