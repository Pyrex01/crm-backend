import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, JwtAuthModule, UserModule],
})
export class AppModule {}
