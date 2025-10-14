import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env'], // hỗ trợ cả local và docker
    }),
    JwtModule.register({
      global: true,
      secret:
        process.env.JWT_SECRET ||
        'your-super-secret-jwt-key-change-this-in-production',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
