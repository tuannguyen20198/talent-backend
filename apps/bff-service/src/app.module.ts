import { Module } from '@nestjs/common';
import { TalentClientModule } from '@nnpp/talent-client';
import { AuthModule } from './modules/auth/auth.module';
import { JobModule } from './modules/job/job.module';
import { UserModule } from './modules/user/user.module';
import { SsoClientModule } from '@nnpp/sso-client';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@tuan/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 👇 Load env variables toàn cục
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env'], // hỗ trợ cả local và docker
    }),
    SsoClientModule,
    TalentClientModule,
    AuthModule,
    UserModule,
    JobModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
