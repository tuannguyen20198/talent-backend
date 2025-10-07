import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateJobRequest, CreateProfileRequest, TalentApi } from './client/generated';

@Injectable()
export class TalentClientService {
  private readonly logger = new Logger(TalentClientService.name);

  constructor(
    private readonly talentApi:TalentApi
  ) {}

  async getJobs() {
    try {
      const res = await this.talentApi.getJobs();
      return res.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createJob(body: CreateJobRequest) {
    try {
      const res = await this.talentApi.createJob({ createJobRequest: body });
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        throw new BadRequestException(error.response.data);
      }

      throw error;
    }
  }

  async getProfiles(candidateId: number) {
    console.log(
      '🚀 ~ TalentClientService ~ getProfiles ~ candidateId:',
      candidateId,
    );
    try {
      const res = await this.talentApi.getProfiles({ candidateId });
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        throw new BadRequestException(error.response.data);
      }

      throw error;
    }
  }

  async createProfile(body: CreateProfileRequest) {
    try {
      const res = await this.talentApi.createProfile({
        createProfileRequest: body,
      });
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        throw new BadRequestException(error.response.data);
      }

      throw error;
    }
  }
}
