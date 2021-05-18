import { HttpService } from '@nestjs/common';
import { toISOShortDate } from '../utils';
import { BaseExchangeRateApi } from './baseExchangeRateApi';

export default class ExchangeRatesApi extends BaseExchangeRateApi {
  private readonly ROOT_URL = `http://api.exchangeratesapi.io/v1`;
  private readonly LATEST_URL = `${this.ROOT_URL}/latest`;

  constructor(private readonly accessKey: string, httpService: HttpService) {
    super('ExchangeRates API', httpService);
  }

  async getAll(): Promise<any> {
    try {
      const { data } = await this.httpService
        .get(this.LATEST_URL, {
          params: {
            access_key: this.accessKey,
            symbols: this.defaultCurrencies.join(','),
          },
        })
        .toPromise();

      return this.wrapResult(data);
    } catch (err) {
      return {
        name: this.name,
        error: err.response?.data?.error || err.message,
      };
    }
  }

  async getByDate(date: Date): Promise<any> {
    try {
      const url = `${this.ROOT_URL}/${toISOShortDate(date)}`;
      const { data } = await this.httpService
        .get(url, {
          params: {
            access_key: this.accessKey,
            symbols: this.defaultCurrencies.join(','),
          },
        })
        .toPromise();

      return this.wrapResult(data);
    } catch (err) {
      return {
        name: this.name,
        error: err.response?.data?.error || err.message,
      };
    }
  }
}
