import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  console.log('✅ NestJS app started, attaching global guards...');
  await app.listen(process.env.port ?? 5050);
}
void bootstrap();
