import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly userService: UserService) {}
  @Post('login')
  login(@Body() data: LoginDto) {
    this.logger.log(`Login request received width ${data.email}}`);
    // eslint-disable-next-line no-useless-catch
    try {
      return this.userService.login(data);
    } catch (error) {
      throw error;
    }
  }
  @Post('register')
  async register(@Body() data: RegisterDto) {
    this.logger.log(`Register request received with ${data.email}`);
    return this.userService.register(data);
  }
  @Post('verify-token')
  verifyToken(@Body() data: VerifyTokenDto) {
    this.logger.log(`VerifyToken called with token: ${data.token}`);
    try {
      return this.userService.verifyToken(data);
    } catch (error) {
      // this.logger.log(error);
      // throw error;
      this.logger.error('VerifyToken failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
