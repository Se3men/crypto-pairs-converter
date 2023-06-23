import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { ConvertCurrencyInput, ConvertedCurrency } from './app.dto';
import { ErrorCalculating } from './error/error-calculating.error';

@Controller({ path: '/currency' })
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get('/convert')
  @ApiResponse({ type: ConvertedCurrency })
  async getConvertedCurrency(
    @Query() dto: ConvertCurrencyInput
  ): Promise<ConvertedCurrency> {
    try {
      return await this._appService.getConvertedCurrency({
        from: dto.from,
        to: dto.to,
        amount: dto.amount
      });
    } catch (error) {
      if (error instanceof ErrorCalculating) {
        throw new ErrorCalculating('An error occurred while calculating!');
      }
    }
  }
}
