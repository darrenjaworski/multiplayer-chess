import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Server, Socket } from 'socket.io';
import { Game } from '../schemas/game.schema';
import { Gateway } from './gateway';

describe('Gateway', () => {
  let gateway: Gateway;
  let server: Partial<Server>;
  let gameModelMock: any;
  let client: Partial<Socket>;

  beforeEach(async () => {
    gameModelMock = {
      findOne: jest.fn(),
      save: jest.fn(),
      updateOne: jest.fn(),
      new: jest.fn(),
    };

    server = {
      in: jest.fn().mockReturnThis(),
      emit: jest.fn(),
    };

    client = {
      join: jest.fn(),
      leave: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Gateway,
        {
          provide: getModelToken(Game.name),
          useValue: gameModelMock,
        },
      ],
    }).compile();

    gateway = module.get<Gateway>(Gateway);
    gateway.server = server as Server;
  });

  describe('onJoinGame', () => {
    it('should handle a player joining an existing game', async () => {
      const game = {
        gameId: 'testGame',
        whitePlayer: 'Player1',
        blackPlayer: null,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        history: [],
        save: jest.fn().mockResolvedValue(true),
        toJSON: () => game,
      };
      gameModelMock.findOne.mockResolvedValue(game);

      const body = {
        gameId: 'testGame',
        playerName: 'Player2',
        preferredColor: 'black',
      };

      await gateway.onJoinGame(body, client as Socket);

      expect(gameModelMock.findOne).toHaveBeenCalledWith({
        gameId: 'testGame',
      });
      expect(game.blackPlayer).toBe('Player2');
      expect(game.save).toHaveBeenCalled();
      expect(client.join).toHaveBeenCalledWith('testGame');
      expect(server.in).toHaveBeenCalledWith('testGame');
      expect(server.emit).toHaveBeenCalledWith('gameEvent', game);
    });

    it('should handle creating a new game if one does not exist', async () => {
      gameModelMock.findOne.mockResolvedValue(null);
      const save = jest.fn().mockResolvedValue(true);
      const mockGameInstance = {
        gameId: 'newGame',
        whitePlayer: 'Player1',
        blackPlayer: null,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        history: [],
        save,
        toJSON: () => mockGameInstance,
      };

      const gameModelConstructor = jest
        .fn()
        .mockImplementation(() => mockGameInstance);
      gateway['gameModel'] = gameModelConstructor as any;
      Object.assign(gateway['gameModel'], gameModelMock);

      const body = {
        gameId: 'newGame',
        playerName: 'Player1',
        preferredColor: 'white',
      };

      await gateway.onJoinGame(body, client as Socket);

      expect(gameModelMock.findOne).toHaveBeenCalledWith({ gameId: 'newGame' });
      expect(save).toHaveBeenCalled();
      expect(client.join).toHaveBeenCalledWith('newGame');
      expect(server.in).toHaveBeenCalledWith('newGame');
      expect(server.emit).toHaveBeenCalledWith('gameEvent', mockGameInstance);
    });
  });

  describe('onLeaveGame', () => {
    it('should handle a player leaving a game', () => {
      const body = { gameId: 'testGame' };
      gateway.onLeaveGame(body, client as Socket);
      expect(client.leave).toHaveBeenCalledWith('testGame');
    });
  });

  describe('onGameUpdate', () => {
    it('should update a game and broadcast the event', async () => {
      const gameData = { gameId: 'testGame', fen: 'new_fen' };
      gameModelMock.findOne.mockResolvedValue({ _id: 'some_id' });
      gameModelMock.updateOne.mockResolvedValue({});

      await gateway.onGameUpdate(gameData);

      expect(server.in).toHaveBeenCalledWith('testGame');
      expect(server.emit).toHaveBeenCalledWith('gameEvent', gameData);
      expect(gameModelMock.updateOne).toHaveBeenCalledWith(
        { _id: 'some_id' },
        { ...gameData },
      );
    });

    it('should create a new game if one does not exist', async () => {
      const gameData = { gameId: 'newGame', fen: 'new_fen' };
      gameModelMock.findOne.mockResolvedValue(null);
      const save = jest.fn().mockResolvedValue(true);
      const gameModelConstructor = jest.fn().mockImplementation(() => ({
        save,
      }));
      gateway['gameModel'] = gameModelConstructor as any;
      Object.assign(gateway['gameModel'], gameModelMock);

      await gateway.onGameUpdate(gameData);

      expect(gameModelMock.findOne).toHaveBeenCalledWith({ gameId: 'newGame' });
      expect(save).toHaveBeenCalled();
    });
  });
});
