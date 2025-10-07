import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Nếu truyền data, trả về field cụ thể trong user (VD: @User('id'))
    if (data) {
      return user?.[data];
    }

    // Nếu không, trả toàn bộ user object
    return user;
  },
);
