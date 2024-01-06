import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

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
