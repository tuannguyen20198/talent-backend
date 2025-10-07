import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Decorated user:', request.user); // 👈 kiểm tra ở đây
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
