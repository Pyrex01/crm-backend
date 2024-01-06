import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';

@Module({
  imports: [PrismaModule, JwtAuthModule],
})
export class AppModule {}
