/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @Get('me')
  async getMe(@Req() req: any) {
    return this.userService.getMe(req.user.id);
  }
  @Get(':userId')
  async findUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.findUserById(userId);
    return {
      ...user,
      password: '',
    };
  }
}
