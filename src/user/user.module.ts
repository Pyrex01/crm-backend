import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtAuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
