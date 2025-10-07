import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getJobs() {
    return this.jobService.getJobs();
  }

  @Post()
  createJob(@Body() body: CreateJobDto) {
    return this.jobService.createJob(body);
  }
}
