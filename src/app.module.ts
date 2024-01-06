import { Module } from '@nestjs/common';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    JwtAuthModule,
    UserModule,
    CustomerModule,
  ],
})
export class AppModule {}
