import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './DTO/login.dto';
import { hashSync, compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schemas/User.schema';
import * as mongoose from 'mongoose';
import { log } from 'console';

@Injectable()
export class UserService {
  private salt: number;
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private configService: ConfigService,
    private jwtAuthService: JwtAuthService,
  ) {
    this.salt = parseInt(configService.get('PASSWORD_SALT'));
    //use this code to create new user
    // const hash = hashSync('admin', this.salt);
    // this.userModel.create({
    //   username: 'admin',
    //   password: hash,
    //   firstName: 'admin',
    //   lastName: 'admin',
    // }).then(console.log)
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });

    if (!user) {
      throw new ForbiddenException('invalid user!')!;
    }
    const isMatch = await compareSync(loginDto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('invalid user!')!;
    }
    const token = this.jwtAuthService.signJwt({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
    return { token };
  }
}
