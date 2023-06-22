import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';

export interface IConvertedCurrency {
  amount: number;
  originalСurrency: string;
  exchangeCurrency: string;
  result: number;
}

export interface IConvertCurrencyInput {
  originalСurrency: string;
  exchangeCurrency?: string;
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
  originalСurrency: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  exchangeCurrency: string;

  @ApiProperty({ type: Number })
  @IsString()
  @IsNotEmpty()
  result: number;
}

export class ConvertCurrencyInput implements IConvertCurrencyInput {
  @ApiProperty({ type: String, default: 'tether', required: false })
  @IsOptional()
  @IsString()
  exchangeCurrency?: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  originalСurrency: string;

  @ApiProperty({ type: Number, default: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  amount?: number;
}
