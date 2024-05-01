import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './DTO/login.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './DTO/login.response.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOkResponse({
    type: LoginResponseDto,
  })

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
