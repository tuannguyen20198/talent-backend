import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SsoClientService } from '@nnpp/sso-client';
import { CreateJobRequest } from '@nnpp/talent-client/client/generated';
import { TalentClientService } from '@nnpp/talent-client/talent-client.service';

@Controller('jobs')
export class JobController {
  constructor(
    private readonly talentService: TalentClientService,
    private readonly ssoClientService: SsoClientService,
  ) {}

  @Get()
  getJobs() {
    return this.talentService.getJobs();
  }

  @Post()
  async createJob(
    @Body() body: CreateJobRequest,
    @Req() req: Request & { user: { id: string } },
  ) {
    const userId = Number(req.user.id);

    body.recruiterId = userId;
    const recruiter = await this.ssoClientService.findUserById(userId);

    if (!recruiter) {
      throw new NotFoundException('Recruiter not found');
    }

    const job = await this.talentService.createJob(body);

    return {
      ...job,
      recruiter,
    };
  }
}
