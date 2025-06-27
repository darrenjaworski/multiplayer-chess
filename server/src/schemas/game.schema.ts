import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Move } from 'chess.js';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  fen: string;

  @Prop({ required: true })
  history: Move[];

  @Prop({ required: false })
  whitePlayer?: string;

  @Prop({ required: false })
  blackPlayer?: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
