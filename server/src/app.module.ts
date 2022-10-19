import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketsGateway } from './websockets/websockets.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebsocketsGateway],
})
export class AppModule {}
