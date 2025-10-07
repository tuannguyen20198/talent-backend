import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(private readonly databaseService: DatabaseService) {}

  getJobs() {
    return this.databaseService.prisma.job.findMany();
  }

  async createJob(body: CreateJobDto) {
    const job = await this.databaseService.prisma.job.create({
      data: body,
    });
    return job;
  }
}
