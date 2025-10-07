import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CreateJobRequest,
  CreateProfileRequest,
  TalentApi,
} from './client/generated';

@Injectable()
export class TalentClientService {
  private readonly logger = new Logger(TalentClientService.name);

  constructor(private readonly talentApi: TalentApi) {}

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
      if (error instanceof BadRequestException) {
        // Nếu lỗi đã là BadRequestException thì ném luôn
        throw error;
      }

      // Kiểm tra error có phải là Error chuẩn không
      if (error instanceof Error) {
        // Có thể parse message hoặc code tùy vào API của bạn
        if (error.message.includes('400')) {
          // Ném ra BadRequestException với message
          throw new BadRequestException(error.message);
        }
      }

      // Ném lại lỗi gốc nếu không xử lý được
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
      if (error instanceof BadRequestException) {
        // Nếu lỗi đã là BadRequestException thì ném luôn
        throw error;
      }

      // Kiểm tra error có phải là Error chuẩn không
      if (error instanceof Error) {
        // Có thể parse message hoặc code tùy vào API của bạn
        if (error.message.includes('400')) {
          // Ném ra BadRequestException với message
          throw new BadRequestException(error.message);
        }
      }

      // Ném lại lỗi gốc nếu không xử lý được
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
      if (error instanceof BadRequestException) {
        // Nếu lỗi đã là BadRequestException thì ném luôn
        throw error;
      }

      // Kiểm tra error có phải là Error chuẩn không
      if (error instanceof Error) {
        // Có thể parse message hoặc code tùy vào API của bạn
        if (error.message.includes('400')) {
          // Ném ra BadRequestException với message
          throw new BadRequestException(error.message);
        }
      }

      // Ném lại lỗi gốc nếu không xử lý được
      throw error;
    }
  }
}
