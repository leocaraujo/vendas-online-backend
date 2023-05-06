import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return {
      ...createUser,
      password: '**********',
    };
  }

  @Get()
  async getAllUsers() {
    return JSON.stringify({ test: 'abc' });
  }
}
