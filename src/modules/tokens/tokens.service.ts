import { JwtService } from '@nestjs/jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './schemas/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private jwtService: JwtService,
  ) {}

  async createTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { id: userId },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const targetToken = await this.findOneByUserId(userId);
    if (!targetToken) {
      const savedToken = await this.tokenModel.create({ userId, refreshToken });
      return savedToken;
    }

    targetToken.refreshToken = refreshToken;
    const updatedToken = await targetToken.save();

    return updatedToken;
  }

  async findOneByUserId(userId: string) {
    const targetToken = await this.tokenModel.findOne({ userId }).exec();
    return targetToken;
  }

  async deteleRefreshToken(userId: string) {
    const deletedToken = await this.tokenModel
      .findOneAndRemove({ userId })
      .exec();
    if (!deletedToken) {
      throw new ForbiddenException();
    }

    return deletedToken;
  }

  async validateRefreshToken(refreshToken: string) {
    const validateResult: { id: string } = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    return validateResult;
  }
}
