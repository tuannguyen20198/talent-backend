import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SsoClientService } from '@nnpp/sso-client';
import {
  CreateUserRequest,
  LoginRequest,
} from '@nnpp/sso-client/client/generated';
import { Public } from '@tuan/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly ssoClientService: SsoClientService) {}

  @Post()
  async register(@Body() body: CreateUserRequest) {
    try {
      return await this.ssoClientService.createUser(body);
    } catch (error) {
      console.error('[AuthController] Register failed:', error);
      throw new InternalServerErrorException(
        'Failed to create user. Please try again later.',
      );
    }
  }
  @Public()
  @Post('login')
  async login(@Body() body: LoginRequest) {
    return await this.ssoClientService.login(body);
  }
}
