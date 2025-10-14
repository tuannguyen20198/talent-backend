import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { JobModule } from './modules/job/job.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env'], // hỗ trợ cả local và docker
    }),
    DatabaseModule, 
    ProfileModule, 
    JobModule],
})
export class AppModule {}
