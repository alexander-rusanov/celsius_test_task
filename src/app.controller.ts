import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseDatePipe } from './pipes/parseDatePipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getLatest(): Promise<any[]> {
    return this.appService.getLatest();
  }

  @Get(':date')
  async getByDate(@Param('date', ParseDatePipe) date: Date): Promise<any[]> {
    console.log(date);
    return this.appService.getByDate(date);
  }
}
