import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { JobModule } from './modules/job/job.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ProfileModule, JobModule],
})
export class AppModule {}
