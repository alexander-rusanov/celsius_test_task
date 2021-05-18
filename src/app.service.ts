import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { BaseExchangeRateApi } from './ratesApis/baseExchangeRateApi';
import ExchangeRatesApi from './ratesApis/exchangesRates.api';
import { OpenExchangeRatesApi } from './ratesApis/openExchangeRates.api';

type CacheFillFunction = () => Promise<any[]>;

@Injectable()
export class AppService {
  private readonly LATEST_CACHE_KEY = 'LATEST';
  private readonly BY_DATE_CACHE_KEY = 'LATEST';
  private readonly DEFAULT_TTL_SECONDS = 5;

  private readonly currencyApis: BaseExchangeRateApi[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.initApis();
  }

  public async getLatest(): Promise<any[]> {
    return this.withCache(
      this.LATEST_CACHE_KEY,
      this.DEFAULT_TTL_SECONDS,
      async () =>
        await Promise.all(this.currencyApis.map((api) => api.getAll())),
    );
  }

  public async getByDate(date: Date): Promise<any[]> {
    return this.withCache(
      this.BY_DATE_CACHE_KEY,
      this.DEFAULT_TTL_SECONDS,
      async () =>
        await Promise.all(this.currencyApis.map((api) => api.getByDate(date))),
    );
  }

  private async withCache(
    cacheKey: string,
    ttl: number,
    fillFunction: CacheFillFunction,
  ): Promise<any[]> {
    const existingData = await this.cacheManager.get<any[]>(cacheKey);
    if (existingData) {
      // logging to show that it's loading from cache
      console.log(`getting from cache ${cacheKey}`);
      return existingData;
    }

    console.log(`populating cache ${cacheKey}`);
    return this.cacheManager.set(cacheKey, await fillFunction(), { ttl });
  }

  private initApis() {
    this.currencyApis.push(
      new ExchangeRatesApi(
        this.configService.get<string>('EXCHANGE_RATE_ACCESS_KEY'),
        this.httpService,
      ),
      new OpenExchangeRatesApi(
        this.configService.get<string>('OPEN_EXCHANGE_RATES_APP_ID'),
        this.httpService,
      ),
    );
  }
}
