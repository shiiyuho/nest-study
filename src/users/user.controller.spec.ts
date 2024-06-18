import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    userName: 'john_doe',
    role: 'user',
    lastLoginAt: null,
    products: [],
  };

  const mockUsersService = {
    findById: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user', async () => {
      expect(await controller.findById(1)).toEqual(mockUser);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        userName: 'john_doe',
        role: 'user',
      };
      expect(await controller.create(createUserDto)).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'newpassword',
      };
      expect(await controller.update(1, updateUserDto)).toEqual(mockUser);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      expect(await controller.delete(1)).toBeUndefined();
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
