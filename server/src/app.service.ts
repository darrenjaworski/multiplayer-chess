import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getGames(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }
}
