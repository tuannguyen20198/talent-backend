import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AuthApi, UserApi } from './client/generated';
import { injectApiProvider } from './utils/providers';
import { SsoClientService } from './sso-client.service';

//Todo: make it as dynamic module
@Global()
@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [
    SsoClientService,
    injectApiProvider(UserApi),
    injectApiProvider(AuthApi),
  ],
  exports: [SsoClientService],
})
export class SsoClientModule {}
