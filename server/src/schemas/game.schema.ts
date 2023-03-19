import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  fen: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
