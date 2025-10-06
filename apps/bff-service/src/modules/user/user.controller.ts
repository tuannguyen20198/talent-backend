/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Req } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Get('me')
  getMe(@Req() req: Request) {
    // TODO: call to sso client service to get user detail
    return (req as any).user;
  }
}
