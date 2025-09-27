import { Global, Module } from '@nestjs/common';
import { TalentClientService } from './talent-client.service';
import { HttpModule } from '@nestjs/axios';
import { injectApiProvider } from './utils/providers';
import { JobsApi } from './client/generated';

@Global()
@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [TalentClientService, injectApiProvider(JobsApi)],
  exports: [TalentClientService],
})
export class TalentClientModule {}
