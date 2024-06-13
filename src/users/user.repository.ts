/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    //パスワードをハッシュ化する処理
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      name,
      email,
      password: hashPassword, //パスワードをハッシュ化
    });

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
