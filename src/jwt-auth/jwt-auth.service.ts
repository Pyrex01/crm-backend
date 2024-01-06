import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtAuthService {
  private privateKey: string;

  constructor(private configService: ConfigService) {
    this.privateKey = this.configService.get('PRIVATE_KEY');
  }

  signJwt(payload: object): string {
    return sign(payload, this.privateKey);
  }

  verifyJwt(jwt): any | null {
    try {
      return verify(jwt, this.privateKey);
    } catch (err) {
      return null;
    }
  }
}
