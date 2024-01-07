import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async deleteCustomer(id: string) {
    const result = await this.customerModel.findById(id);
    if (!result.isDeleted) {
      await result.updateOne({ isDeleted: true });
      return { message: 'deletion success!' };
    }
    throw new BadRequestException("Customer doesn't exist!");
  }

  async getCustomers(customerPageDTO: CustomerPageDTO) {
    const skip = (customerPageDTO.pageNo - 1) * customerPageDTO.pageSize;
    return await this.customerModel
      .find({ isDeleted: false })
      .limit(customerPageDTO.pageSize)
      .skip(skip)
      .select(['firstName', 'lastName', 'email', 'score', 'image']);
  }

  async getCustomer(id: string) {
    try {
      const result = await this.customerModel.findById(id);
      return result;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new NotFoundException("Customer doesn't exist!");
      }
      throw error;
    }
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
    const result = await this.customerModel.findByIdAndUpdate(
      id,
      updateCustomerDTO,
      {
        returnDocument: 'after',
      },
    );
    if (!result) {
      throw new NotFoundException('no such user to update!');
    }
    return result;
  }
}
