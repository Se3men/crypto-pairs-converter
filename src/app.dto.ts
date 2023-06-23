import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';
import { CryptoCurrency } from './app.types';

export interface IConvertedCurrency {
  amount: number;
  from: string;
  to: string;
  result: number;
}

export interface IConvertCurrencyInput {
  from: string;
  to?: string;
  amount?: number;
}

export class ConvertedCurrency implements IConvertedCurrency {
  constructor(values: ConvertedCurrency) {
    Object.assign(this, values);
  }

  @ApiProperty({ type: Number })
  @IsString()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ type: Number })
  @IsString()
  @IsNotEmpty()
  result: number;
}

export class ConvertCurrencyInput implements IConvertCurrencyInput {
  @ApiProperty({ enum: CryptoCurrency, required: true })
  @IsNotEmpty()
  @IsEnum(CryptoCurrency)
  from: CryptoCurrency;

  @ApiProperty({
    enum: CryptoCurrency,
    default: CryptoCurrency.tether,
    required: false
  })
  @IsOptional()
  @IsEnum(CryptoCurrency)
  to?: CryptoCurrency;

  @ApiProperty({ type: Number, default: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  amount?: number;
}
