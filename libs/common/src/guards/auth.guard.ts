import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SsoClientService } from '@nnpp/sso-client';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly ssoClientService: SsoClientService,
    private readonly reflector: Reflector,
  ) {
    console.log('✅ AuthGuard has been constructed');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    // const { method, url } = request;
    // 1. Kiểm tra @Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // 2. Lấy token
    const authHeader = request.headers?.authorization;
    const token =
      typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // 3. Xác thực token
    try {
      const decoded = await this.ssoClientService.verifyToken({ token });
      console.log('✅ [AuthGuard] Token decoded:', decoded);

      request.user = {
        id: decoded.sub,
        email: decoded.email,
      };

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ [AuthGuard] Token verify failed:', error.message);
        throw new UnauthorizedException('Invalid token');
      } else {
        console.error('❌ [AuthGuard] Token verify failed:', error);
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
