import { IsNotEmpty, IsNumber } from 'class-validator';

export class CustomerPageDTO {
  @IsNotEmpty()
  pageNo: number;

  @IsNotEmpty()
  pageSize: number;
}
