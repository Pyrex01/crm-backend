import { ApiProperty } from '@nestjs/swagger';

export class CustomerDetailPayLoad {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  note: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  id: string;
}
