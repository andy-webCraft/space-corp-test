import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    if (accessToken === process.env.TEST_ACCESS_TOKEN) {
      return true;
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      request['user'] = { id: payload.id };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
