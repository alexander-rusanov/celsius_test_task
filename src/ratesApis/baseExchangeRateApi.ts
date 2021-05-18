import { HttpService } from '@nestjs/common';

export abstract class BaseExchangeRateApi {
  protected readonly defaultCurrencies: string[] = ['BTC', 'USD', 'ILS', 'RSD'];

  constructor(
    protected readonly name: string,
    protected readonly httpService: HttpService,
  ) {}

  abstract getAll(): Promise<any>;

  abstract getByDate(date: Date): Promise<any>;

  protected wrapResult(result: any) {
    return {
      name: this.name,
      ...result,
      exactUtcDate: new Date(result.timestamp * 1000),
    };
  }
}
