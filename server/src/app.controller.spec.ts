import { Test, TestingModule } from '@nestjs/testing';
import { Chess } from 'chess.js';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return starting fen', () => {
      const game = new Chess();
      expect(appController.getStartingStatus()).toEqual({ fen: game.fen() });
    });
  });
});
