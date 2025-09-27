import { Body, Controller, Logger, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { VerifyTokenDto } from './dto/verify-token.dto';

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
  @Post('verify-token')
  verifyToken(@Body() data: VerifyTokenDto) {
    try {
      return this.userService.verifyToken(data);
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
