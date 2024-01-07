import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  score: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  address: string;
}
