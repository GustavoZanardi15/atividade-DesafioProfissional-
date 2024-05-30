const { IsString, IsNumber, IsPositive, Min } = require('class-validator');

class ProductDto {
  @IsString()
  name;

  @IsNumber()
  @IsPositive()
  value;

  @IsNumber()
  @Min(0)
  quantity;

  constructor(name, value, quantity) {
    this.name = name;
    this.value = value;
    this.quantity = quantity;
  }
}

module.exports = ProductDto;
