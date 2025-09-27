/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SsoClientService } from '@nnpp/sso-client';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly ssoClientService: SsoClientService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    console.log('>>> Raw token =', token);

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decoded = await this.ssoClientService.verifyToken({ token });
      console.log('>>> Decoded token =', decoded);

      request.user = {
        id: decoded.sub,
        email: decoded.email,
      };

      console.log('>>> Request.user set =', request.user);

      return true;
    } catch (e) {
      console.error('Verify error', e);
      throw new UnauthorizedException();
    }
  }
}
