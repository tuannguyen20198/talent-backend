/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { SsoClientService } from '@nnpp/sso-client';
import { CreateUserRequest } from '@nnpp/sso-client/client/generated';
import { Public } from '@tuan/common/decorators/public.decorator';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly ssoClientService: SsoClientService) {}

  @Public()
  @Post()
  async register(@Body() body: CreateUserRequest) {
    try {
      const res = await this.ssoClientService.createUser(body);
      return res;
    } catch (error) {
      // Example: wrap or log before rethrowing
      this.logger.error(error);
      throw error;
    }
  }

  @Get('me')
  getMe(@Req() req: Request) {
    // TODO: call to sso client service to get user detail
    return (req as any).user;
  }
}
