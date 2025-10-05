import { Controller, Get } from '@nestjs/common';
import { TalentClientService } from '@nnpp/talent-client/talent-client.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly talentService: TalentClientService) {}

  @Get()
  getJobs() {
    return this.talentService.getJobs();
  }
}
