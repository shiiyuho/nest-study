/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
async createUser(createUserDto:CreateUserDto):Promise<User>{
    const{id,name,email,password}=createUserDto;
    const user =this.create({
        id,
        name,
        email,
        password,
    });

    await this.save(user);

    return user;
}
}