import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '@modules/users/schemas/user.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
