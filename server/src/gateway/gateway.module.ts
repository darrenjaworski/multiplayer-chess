import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from 'src/schemas/game.schema';
import { Gateway } from './gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  providers: [Gateway],
})
export class GatewayModule {}
