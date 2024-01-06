import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './DTO/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync, compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Injectable()
export class UserService {
  private salt: number;
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtAuthService: JwtAuthService,
  ) {
    this.salt = parseInt(configService.get('PASSWORD_SALT'));
    //use this code to create new user
    // const hash = hashSync('admin', this.salt);
    // this.prismaService.user.create({
    //   data: { name: 'admin', username: 'admin', password: hash },
    // }).then(console.log);
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username: loginDto.username },
    });
    if (!user) {
      throw new ForbiddenException('invalid user!')!;
    }
    const isMatch = await compareSync(loginDto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('invalid user!')!;
    }
    const token = this.jwtAuthService.signJwt({
      id: user.id,
      name: user.name,
      username: user.username,
    });
    return { token };
  }
}
