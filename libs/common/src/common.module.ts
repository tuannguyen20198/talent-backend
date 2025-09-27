import { Module } from '@nestjs/common';

// Import các pipes, guards, interceptors từ thư mục tương ứng
import { ValidationPipe } from './pipes/validation.pipe';
import { TrimPipe } from './pipes/trim.pipe';

import { CacheInterceptor } from './interceptors/cache.interceptor';

import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [ValidationPipe, TrimPipe, CacheInterceptor, RolesGuard],
  exports: [ValidationPipe, TrimPipe, CacheInterceptor, RolesGuard],
})
export class CommonModule {}
