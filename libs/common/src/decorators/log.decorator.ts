import { SetMetadata } from '@nestjs/common';

export const Log = (message: string) => SetMetadata('logMessage', message);
