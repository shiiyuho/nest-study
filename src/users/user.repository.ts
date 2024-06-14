/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);

    //パスワードをハッシュ化する処理
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.create({
      ...createUserDto,
      password: hashPassword, //パスワードをハッシュ化
    });
    console.log(user);

    await this.save(user);
    return user;
  }

  async findById(id: number): Promise<User | undefined> {
    return this.findOne(id);
  }

  async saveUser(user: User): Promise<User> {
    return this.save(user);
  }

  async removeUser(user: User): Promise<void> {
    await this.remove(user);
  }
}
