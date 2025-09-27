import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getJobs() {
    return this.jobService.getJobs();
  }
}
