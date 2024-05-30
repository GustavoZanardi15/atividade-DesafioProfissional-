import { IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  constructor(name: string, value: number, quantity: number) {
    this.name = name;
    this.value = value;
    this.quantity = quantity;
  }
}
