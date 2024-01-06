import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { CustomerSchema } from 'src/Schemas/Customer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    JwtAuthModule,
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
