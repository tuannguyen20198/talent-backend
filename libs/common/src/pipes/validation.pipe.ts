/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipeOptions,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private options: ValidationPipeOptions;

  constructor(options?: ValidationPipeOptions) {
    this.options = options || {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    };
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, this.options);

    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }

    return this.options.transform ? object : value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors
      .map((err) => {
        if (err.constraints) {
          return Object.values(err.constraints).join(', ');
        }
        return '';
      })
      .join('; ');
  }
}
