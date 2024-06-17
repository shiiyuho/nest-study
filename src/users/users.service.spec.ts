import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  find: jest.fn(),
});

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
});
