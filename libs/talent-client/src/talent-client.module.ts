import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TalentApi } from './client/generated';
import { TalentClientService } from './talent-client.service';
import { injectApiProvider } from './utils/providers';

@Global()
@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [TalentClientService, injectApiProvider(TalentApi)],
  exports: [TalentClientService],
})
export class TalentClientModule {}
