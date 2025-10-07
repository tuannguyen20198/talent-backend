import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (
      typeof request === 'object' &&
      request !== null &&
      'user' in request &&
      typeof (request as Record<string, unknown>).user === 'object' &&
      (request as Record<string, unknown>).user !== null
    ) {
      // Ép kiểu user thành Record<string, unknown> để truy cập an toàn
      const user = (request as Record<string, unknown>).user as Record<
        string,
        unknown
      >;

      if (data) {
        // Kiểm tra data là key tồn tại trong user và kiểu của user[data] không undefined
        if (data in user) {
          return user[data];
        }
        return null;
      }

      return user;
    }

    return null;
  },
);
