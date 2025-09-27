import { Injectable, Logger } from '@nestjs/common';
import { JobsApi } from './client/generated';

@Injectable()
export class TalentClientService {
  private readonly logger = new Logger(TalentClientService.name);

  constructor(private readonly jobsApi: JobsApi) {}

  async getJobs() {
    try {
      const res = await this.jobsApi.getJobs();
      return res.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
