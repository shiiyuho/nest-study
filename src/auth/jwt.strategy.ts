import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payloud: { id: number; userName: string }): Promise<User> {
    const { id, userName } = payloud;
    const user = await this.userRepository.findOne({ id, userName });

    if (user) {
      return user;
    }
    throw new UnauthorizedException('違いまーーーーーす');
  }
}
