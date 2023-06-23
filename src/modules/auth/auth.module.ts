import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@modules/users/users.module';
import { TokensModule } from '@modules/tokens/tokens.module';

@Module({
  imports: [TokensModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
