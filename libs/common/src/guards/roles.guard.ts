/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Nếu không yêu cầu role, cho phép truy cập
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return (
      user &&
      user.roles &&
      requiredRoles.some((role) => user.roles.includes(role))
    );
  }
}
