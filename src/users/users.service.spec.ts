import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

const mockUserRepository = () => ({
  findById: jest.fn(),
  createUser: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('findById', () => {
    it('throws an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);
      await expect(usersService.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('calls createUser and returns the result', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'Test',
        password: 'test',
        id: 0,
        name: '',
        email: '',
        role: '',
      };
      userRepository.createUser.mockResolvedValue('someUser');
      const result = await usersService.create(createUserDto);
      expect(result).toEqual('someUser');
    });
  });

  describe('update', () => {
    it('throws an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);
      const updateUserDto: UpdateUserDto = { userName: 'Updated' };
      await expect(usersService.update(1, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('updates the user if found', async () => {
      const user = { id: 1, userName: 'Test', password: 'test' } as User;
      userRepository.findById.mockResolvedValue(user);
      const updateUserDto: UpdateUserDto = { userName: 'Updated' };
      const updatedUser = { ...user, ...updateUserDto };
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await usersService.update(1, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe('delete', () => {
    it('throws an error if user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);
      await expect(usersService.delete(1)).rejects.toThrow(NotFoundException);
    });

    it('removes the user if found', async () => {
      const user = { id: 1, userName: 'Test', password: 'test' } as User;
      userRepository.findById.mockResolvedValue(user);

      await usersService.delete(1);
      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });
  });
});
