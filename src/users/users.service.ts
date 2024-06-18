/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    console.log(
      'UsersService initialized with UserRepository:',
      this.userRepository,
    );
  }

  async findById(id: number): Promise<User> {
    console.log('検索対象ID:', id);

    const found = await this.userRepository.findById(id);
    if (!found) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    console.log('見つかったユーザー:', found); // デバッグ用ログ

    return found;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('Creating user:', createUserDto); // デバッグ用ログ
    return this.userRepository.createUser(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log('Updating user ID:', id, 'with data:', updateUserDto); // デバッグ用ログ
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<void> {
    console.log('Deleting user ID:', id); // デバッグ用ログ
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    await this.userRepository.remove(user);
  }
}
