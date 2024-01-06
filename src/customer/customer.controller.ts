import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CreateCustomerDTO } from './DTO/create-customer.dto';
import { UpdateCustomerDTO } from './DTO/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDTO) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateCustomer(@Body() updateCustomerDTO: UpdateCustomerDTO) {
    return await this.customerService.updateCustomer(updateCustomerDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return await this.customerService.getCustomer(id);
  }
}
