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

enum ServerEvents {
  GAME_EVENT = 'gameEvent',
}

enum ClientEvents {
  JOIN_GAME = 'joinGame',
  LEAVE_GAME = 'leaveGame',
  GAME_UPDATE = 'gameUpdate',
}

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

  handleConnection(client: Socket) {
    this.logger.log(client.id);
    this.logger.log('handleConnection');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id);
    this.logger.log('handleDisconnection');
  }

  @SubscribeMessage(ClientEvents.JOIN_GAME)
  async onJoinGame(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { gameId, playerName, preferredColor } = body;
    this.logger.log('join game ', gameId, client.id);
    let game = await this.gameModel.findOne({ gameId });
    if (!game) {
      game = new this.gameModel({
        gameId,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        history: [],
      });
    }

    // Assign player to color if available
    if (preferredColor === 'white') {
      if (!game.whitePlayer) {
        game.whitePlayer = playerName;
      } else if (!game.blackPlayer) {
        game.blackPlayer = playerName;
      }
    } else if (preferredColor === 'black') {
      if (!game.blackPlayer) {
        game.blackPlayer = playerName;
      } else if (!game.whitePlayer) {
        game.whitePlayer = playerName;
      }
    } else {
      // No preference, assign to any open slot
      if (!game.whitePlayer) {
        game.whitePlayer = playerName;
      } else if (!game.blackPlayer) {
        game.blackPlayer = playerName;
      }
    }

    client.join(gameId);
    await game.save();
    // Broadcast updated game state to all clients in the room
    this.server.in(gameId).emit(ServerEvents.GAME_EVENT, game.toJSON());
    this.logger.log('emitted game event on join');
  }

  @SubscribeMessage(ClientEvents.LEAVE_GAME)
  onLeaveGame(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { gameId } = body;
    this.logger.log('leave game ', gameId, client.id);
    client.leave(gameId);
  }

  @SubscribeMessage(ClientEvents.GAME_UPDATE)
  async onGameUpdate(@MessageBody() body: any) {
    const { gameId } = body;
    this.server.in(gameId).emit(ServerEvents.GAME_EVENT, body);
    console.log('emitted on game update');
    let game = await this.gameModel.findOne({ gameId });
    if (!game) {
      game = new this.gameModel({
        ...body,
      });
      await game.save();
      return;
    }
    await this.gameModel.updateOne({ _id: game._id }, { ...body });
  }

  @SubscribeMessage('makeMove')
  async onMakeMove(
    @MessageBody() body: { gameId: string; move: any },
    @ConnectedSocket() client: Socket,
  ) {
    const { gameId, move } = body;
    let game = await this.gameModel.findOne({ gameId });
    if (!game) return;

    // Use chess.js to validate and apply the move
    const Chess = require('chess.js').Chess;
    const chess = new Chess(game.fen);
    const result = chess.move(move);

    if (!result) {
      // Invalid move, optionally emit an error
      this.server.to(client.id).emit('invalidMove', { move });
      return;
    }

    // Update game state
    game.fen = chess.fen();
    game.history.push(result);
    await game.save();

    // Broadcast new state
    this.server.in(gameId).emit('gameEvent', game.toJSON());
  }
}
