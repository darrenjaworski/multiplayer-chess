import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Game } from './schemas/game.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/games')
  async getGames(): Promise<Game[]> {
    return await this.appService.getGames();
  }
}
