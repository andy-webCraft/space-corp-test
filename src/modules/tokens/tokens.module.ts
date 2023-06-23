import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Token, TokenSchema } from './schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
