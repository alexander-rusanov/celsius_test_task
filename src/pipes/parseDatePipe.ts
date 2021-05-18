import { BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';

export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: never) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Validation failed - invalid date');
    }

    return date;
  }
}
