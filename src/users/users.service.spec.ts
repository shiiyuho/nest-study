import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});

const mockUser1 = {
  id: '2',
  userName: 'test2',
  password: '5678',
};

const mockUser2 = {
  id: '1',
  userName: 'test1',
  password: '1234',
};

describe('UsersServiceTest', () => {
  let userRepository;
  let usersService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      userRepository.find.mockResolvedValue(expected);
      const result = await usersService.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      userRepository.findOne.mockResolvedValue(expected);
      const result = await usersService.findById('test-id');
      expect(result).toEqual(expected);
    });
  });
});
