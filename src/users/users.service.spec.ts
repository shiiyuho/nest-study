import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        userName: 'testuser',
        role: 'user',
      };
      userRepository.createUser.mockResolvedValue(createUserDto as User);

      expect(await service.create(createUserDto)).toEqual(createUserDto);
      expect(userRepository.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, name: 'Test User' } as User;
      userRepository.findById.mockResolvedValue(user);

      expect(await service.findById(1)).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      const user = { id: 1, name: 'Test User' } as User;

      userRepository.findById.mockResolvedValue(user);
      userRepository.save.mockResolvedValue({ ...user, ...updateUserDto });

      expect(await service.update(1, updateUserDto)).toEqual({
        ...user,
        ...updateUserDto,
      });
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.save).toHaveBeenCalledWith({
        ...user,
        ...updateUserDto,
      });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = { id: 1, name: 'Test User' } as User;

      userRepository.findById.mockResolvedValue(user);
      userRepository.remove.mockResolvedValue(null);

      await service.delete(1);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });
  });
});
