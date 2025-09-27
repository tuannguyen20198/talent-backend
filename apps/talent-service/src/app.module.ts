import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [ProfileModule, JobModule],
})
export class AppModule {}
