import { ApiProperty } from '@nestjs/swagger';

export class CustomerRow {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  id: string;
}
