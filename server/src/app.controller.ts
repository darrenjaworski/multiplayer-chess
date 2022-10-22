import { Controller, Get } from '@nestjs/common';
import { AppService, GameState } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStartingStatus(): GameState {
    return this.appService.getStartingStatus();
  }
}
