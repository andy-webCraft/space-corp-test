import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from './decorators/cookies.decorator';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { loginResponse } from './schemas/loginResponse.schema';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'register new user' })
  @ApiOkResponse({ type: String })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'login user' })
  @ApiOkResponse(loginResponse)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() credentials: LoginDto,
  ) {
    const { user, tokens } = await this.authService.login(credentials);

    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return { user, accessToken: tokens.accessToken };
  }

  @ApiOperation({ summary: 'logout user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: String })
  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @User('id') userId: string,
  ) {
    await this.authService.logout(userId);
    response.clearCookie('refreshToken');

    return 'User logged out';
  }

  @ApiOperation({ summary: 'refresh jwt tokens' })
  @ApiOkResponse({
    schema: { type: 'object', properties: { accessToken: { type: 'string' } } },
  })
  @Get('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Cookies('refreshToken') oldRefreshToken: string,
  ) {
    if (!oldRefreshToken) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } = await this.authService.refresh(
      oldRefreshToken,
    );

    response.cookie('refreshToken', refreshToken, { httpOnly: true });
    return { accessToken };
  }
}
