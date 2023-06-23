import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseExceptionFilter } from '@filters/mongooseException.filter';
import { AuthModule } from '@modules/auth/auth.module';
import { TokensModule } from '@modules/tokens/tokens.module';
import { UsersModule } from '@modules/users/users.module';
import { MoviesModule } from '@modules/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    }),
    JwtModule.register({ global: true }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    AuthModule,
    TokensModule,
    UsersModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongooseExceptionFilter,
    },
  ],
})
export class AppModule {}
