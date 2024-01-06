import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CreateCustomerDTO } from './DTO/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDTO) {
    return await this.customerService.createCustomer(createCustomerDto);
  }
}
