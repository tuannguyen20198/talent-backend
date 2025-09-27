import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhoneValidationPipe implements PipeTransform {
  transform(value: any) {
    const phoneRegex = /^\+?[0-9]{7,15}$/; // số điện thoại quốc tế đơn giản
    if (typeof value !== 'string' || !phoneRegex.test(value)) {
      throw new BadRequestException('Invalid phone number format');
    }
    return value;
  }
}
