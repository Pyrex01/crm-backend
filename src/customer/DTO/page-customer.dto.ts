import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CustomerPageDTO {
  @ApiProperty()
  @IsNotEmpty()
  pageNo: number;
  
  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;
}
