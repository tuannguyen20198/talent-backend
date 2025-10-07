import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { TalentClientService } from '@nnpp/talent-client';
import { CreateProfileRequest } from '@nnpp/talent-client/client/generated';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly talentClientService: TalentClientService) {}

  @Get()
  getProfiles(@Req() req: Request & { user: { id: number } }) {
    const userId = req.user.id;
    return this.talentClientService.getProfiles(userId);
  }

  @Post()
  createProfile(
    @Req() req: Request & { user: { id: number } },
    @Body() body: CreateProfileRequest,
  ) {
    const userId = req.user.id;
    body.candidateId = userId;
    return this.talentClientService.createProfile(body);
  }
}