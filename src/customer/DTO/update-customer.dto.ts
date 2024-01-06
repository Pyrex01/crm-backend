import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsString()
  desciption: string;

  @IsString()
  note: string;

  @IsString()
  address: string;
}
