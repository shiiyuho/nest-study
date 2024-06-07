/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.enthity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  findById(id: number): User {
    const found = this.users.find((user) => user.id === id);
    if (!found) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    return found;
  }
  create(createUserDto: CreateUserDto): User {
    const found = this.users.find((user) => user.email === createUserDto.email);
    if (found) {
      throw new NotFoundException('メールアドレスがすでに登録されています');
    }
    const user: User = {
      ...createUserDto,
      products: [],
    };
    this.users.push(user);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const user = this.users[userIndex];
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    this.users[userIndex] = user; // インデックスを使用してユーザーを更新
    return user;
  }
  delete(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
