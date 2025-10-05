import { Body, Controller, Post } from '@nestjs/common';
import { SsoClientService } from '@nnpp/sso-client';
import { LoginRequest } from '@nnpp/sso-client/client/generated';

@Controller('auth')
export class AuthController {
  constructor(private readonly ssoClientService: SsoClientService) {}
  @Post('login')
  async login(@Body() body: LoginRequest) {
    return await this.ssoClientService.login(body);
  }
}
