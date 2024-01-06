import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';

@Module({
  imports: [PrismaModule, ConfigModule, JwtAuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
