import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CreateCustomerDTO } from './DTO/create-customer.dto';
import { UpdateCustomerDTO } from './DTO/update-customer.dto';
import { CustomerPageDTO } from './DTO/page-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/page')
  async getCustomers(@Query() customerPageDTO: CustomerPageDTO) {
    return await this.customerService.getCustomers(customerPageDTO);
  }

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    return await this.customerService.deleteCustomer(id);
  }
}
