import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Game } from './schemas/game.schema';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello World!'),
            getGames: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
      expect(appService.getHello).toHaveBeenCalled();
    });
  });

  describe('getGames', () => {
    it('should return an array of games', async () => {
      const result: Game[] = [
        {
          gameId: '123',
          fen: '',
          history: [],
        },
      ];
      jest.spyOn(appService, 'getGames').mockResolvedValue(result);

      expect(await appController.getGames()).toBe(result);
    });
  });
});
