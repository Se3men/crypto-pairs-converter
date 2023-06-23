import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ConvertCurrencyInput, ConvertedCurrency } from './app.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import BigNumber from 'bignumber.js';
import { CRYPTORANK_API_URL } from './app.constants';
import { CryptoCurrency } from './app.types';
import { ErrorCalculating } from './error/error-calculating.error';

export interface IPricesCurrency {
  priceFrom: number;
  priceTo: number;
}

@Injectable()
export class AppService {
  constructor(
    @Inject(HttpService)
    private readonly _httpService: HttpService,
    @Inject(ConfigService)
    private readonly _configService: ConfigService,
    @Inject(ConsoleLogger)
    private readonly _logger: ConsoleLogger
  ) {
    this._logger.setContext(AppService.name);
  }
  public async getConvertedCurrency({
    from,
    to = CryptoCurrency.tether,
    amount = 1
  }: ConvertCurrencyInput): Promise<ConvertedCurrency> {
    const pricesCurrency = await this._getPricesCurrency(from, to);
    const result = this._calcAmountCurrency(pricesCurrency, amount);

    if (typeof result === 'number' && Number.isFinite(result)) {
      return new ConvertedCurrency({
        amount,
        from,
        to,
        result
      });
    } else {
      throw new ErrorCalculating('An error occurred while calculating!');
    }
  }

  private async _getPricesCurrency(
    from: string,
    to: string
  ): Promise<IPricesCurrency> {
    try {
      this._logger.log('Getting data from external API');
      const { data } = await this._httpService.axiosRef.get(
        `${CRYPTORANK_API_URL}${this._configService.get<string>('API_KEY')}`
      );
      this._logger.log('Data from external API received');

      const pricesCurrency: IPricesCurrency = {
        priceFrom: 0,
        priceTo: 0
      };

      for (const platform of data.data) {
        if (platform.slug === from) {
          pricesCurrency.priceFrom = platform.values.USD.price;
        }
        if (platform.slug === to) {
          pricesCurrency.priceTo = platform.values.USD.price;
        }
      }

      return pricesCurrency;
    } catch (error) {
      this._logger.error('Error while getting data from third party API');
      throw new Error(error);
    }
  }

  public _calcAmountCurrency(
    pricesCurrency: IPricesCurrency,
    amount: number
  ): number {
    return new BigNumber((amount * pricesCurrency.priceFrom).toString())
      .div(pricesCurrency.priceTo.toString())
      .toNumber();
  }
}
