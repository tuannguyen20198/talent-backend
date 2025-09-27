import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
// nếu không dùng global guard, thì thêm vào providers và gắn UseGuards trong controller
@Module({
  controllers: [UserController],
})
export class UserModule {}
