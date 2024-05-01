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
import { ApiOkResponse } from '@nestjs/swagger';
import { CustomerRow } from './DTO/customer-page.dto';
import { CustomerDetailPayLoad } from './DTO/customer-detail.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiOkResponse({
    type: CustomerRow,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/page')
  async getCustomers(@Query() customerPageDTO: CustomerPageDTO) {
    return await this.customerService.getCustomers(customerPageDTO);
  }

  @ApiOkResponse({
    type: CreateCustomerDTO,
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDTO) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @ApiOkResponse({
    type: UpdateCustomerDTO,
  })
  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateCustomer(@Body() updateCustomerDTO: UpdateCustomerDTO) {
    return await this.customerService.updateCustomer(updateCustomerDTO);
  }

  @ApiOkResponse({
    type: CustomerDetailPayLoad,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return await this.customerService.getCustomer(id);
  }

  @ApiOkResponse({
    type: CustomerDetailPayLoad,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    return await this.customerService.deleteCustomer(id);
  }
}
