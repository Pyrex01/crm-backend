import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/Schemas/Customer.schema';
import { CreateCustomerDTO } from './DTO/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDTO) {
    try {
      return await this.customerModel.create(createCustomerDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('email already in use!');
      }
      throw error;
    }
  }
}
