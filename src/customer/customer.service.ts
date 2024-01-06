import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/Schemas/Customer.schema';
import { CreateCustomerDTO } from './DTO/create-customer.dto';
import { UpdateCustomerDTO } from './DTO/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDTO) {
    try {
      return (await this.customerModel.create(createCustomerDto)).save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('email already in use!');
      }
      throw error;
    }
  }

  async updateCustomer(updateCustomerDTO: UpdateCustomerDTO) {
    const id = updateCustomerDTO.id;
    delete updateCustomerDTO.id;
    console.log(id);
    console.log(updateCustomerDTO);
    return await this.customerModel.findByIdAndUpdate(id, updateCustomerDTO, {
      returnDocument: 'after',
    });
  }
}
