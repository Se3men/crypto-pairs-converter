import { Test } from '@nestjs/testing';
import { AppService, IPricesCurrency } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConsoleLogger } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [AppService, ConsoleLogger]
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
  });

  describe('calcAmountCurrency', () => {
    it('calcAmountCurrency should return a number', () => {
      const pricesCurrency: IPricesCurrency = {
        priceFrom: 1,
        priceTo: 1
      };
      const amount = 10;
      const result = appService._calcAmountCurrency(pricesCurrency, amount);
      expect(typeof result).toEqual('number');
    });

    it('calcAmountCurrency should not return NaN or Infinity', () => {
      const pricesCurrency: IPricesCurrency = {
        priceFrom: 1,
        priceTo: 1
      };
      const amount = 10;
      const result = appService._calcAmountCurrency(pricesCurrency, amount);
      expect(result).not.toEqual(NaN);
      expect(result).not.toEqual(Infinity);
    });

    it('calcAmountCurrency should accept arguments of type number', () => {
      const pricesCurrency: IPricesCurrency = {
        priceFrom: 1,
        priceTo: 1
      };
      const amount = 10;
      appService._calcAmountCurrency(pricesCurrency, amount);
      expect(typeof pricesCurrency.priceFrom).toEqual('number');
      expect(typeof pricesCurrency.priceTo).toEqual('number');
      expect(typeof amount).toEqual('number');
    });
  });
});
