import { HttpService } from '@nestjs/common';
import { toISOShortDate } from '../utils';
import { BaseExchangeRateApi } from './baseExchangeRateApi';

export class OpenExchangeRatesApi extends BaseExchangeRateApi {
  private readonly ROOT_URL = 'https://openexchangerates.org/api/';
  private readonly LATEST_URL = `${this.ROOT_URL}/latest.json`;

  constructor(private readonly appId: string, httpService: HttpService) {
    super('OpenExchangeRates API', httpService);
  }

  async getAll(): Promise<any> {
    try {
      const { data } = await this.httpService
        .get(`${this.ROOT_URL}/latest.json`, {
          params: {
            app_id: this.appId,
            symbols: this.defaultCurrencies.join(','),
          },
        })
        .toPromise();

      return this.wrapResult(data);
    } catch (err) {
      console.log(err.response);
      return {
        name: this.name,
        error: err.response?.data?.description || err.message,
      };
    }
  }

  async getByDate(date: Date): Promise<any> {
    try {
      const url = `${this.ROOT_URL}/historical/${toISOShortDate(date)}.json`;
      const { data } = await this.httpService
        .get(url, {
          params: {
            app_id: this.appId,
            symbols: this.defaultCurrencies.join(','),
          },
        })
        .toPromise();

      return this.wrapResult(data);
    } catch (err) {
      return {
        name: this.name,
        error: err.response?.data?.description || err.message,
      };
    }
  }
}
