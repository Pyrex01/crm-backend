import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/Schemas/Customer.schema';
import { CreateCustomerDTO } from './DTO/create-customer.dto';
import { UpdateCustomerDTO } from './DTO/update-customer.dto';
import { CustomerPageDTO } from './DTO/page-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async getCustomers(customerPageDTO: CustomerPageDTO) {
    const skip = (customerPageDTO.pageNo - 1) * customerPageDTO.pageSize;
    return await this.customerModel
      .find({ isDeleted: false })
      .limit(customerPageDTO.pageSize)
      .skip(skip)
      .select(['firstName', 'lastName', 'email', 'score', 'image']);
  }

  async getCustomer(id: string) {
    return await this.customerModel.findById(id);
  }

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
