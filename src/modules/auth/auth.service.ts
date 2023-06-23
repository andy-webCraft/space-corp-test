import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@modules/users/users.service';
import { TokensService } from '@modules/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private tokensService: TokensService,
    private usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { name, login, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    await this.usersService.create({
      name,
      login,
      password: passwordHash,
    });

    return 'New user has been registered';
  }

  async login(credentials: LoginDto) {
    const { login, password } = credentials;
    const user = await this.usersService.findOneByLogin(login);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.tokensService.createTokens(
      user.id,
    );

    await this.tokensService.saveRefreshToken(user.id, refreshToken);
    user.password = undefined;

    return { user, tokens: { accessToken, refreshToken } };
  }

  async logout(userId: string) {
    return this.tokensService.deteleRefreshToken(userId);
  }

  async refresh(oldRefreshToken: string) {
    const payload = await this.tokensService.validateRefreshToken(
      oldRefreshToken,
    );

    const { accessToken, refreshToken } = await this.tokensService.createTokens(
      payload.id,
    );

    await this.tokensService.saveRefreshToken(payload.id, refreshToken);
    return { accessToken, refreshToken };
  }
}
