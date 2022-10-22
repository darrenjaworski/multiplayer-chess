import { Injectable } from '@nestjs/common';
import { Chess } from 'chess.js';

export interface GameState {
  fen: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({ status: 'ready' });
  }

  getStartingStatus(): GameState {
    const game = new Chess();
    return { fen: game.fen() };
  }
}
