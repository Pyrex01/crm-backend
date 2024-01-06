import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [JwtAuthService],
})
export class JwtAuthModule {}
