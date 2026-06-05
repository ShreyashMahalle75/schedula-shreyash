import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token missing');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      console.log('TOKEN =>', token);

      const payload = this.jwtService.verify(token, {
        secret: 'schedula-secret-key',
      });

      console.log('PAYLOAD =>', payload);

      request.user = payload;

      return true;
    } catch (error) {
      console.log('JWT ERROR =>', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}