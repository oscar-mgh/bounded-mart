import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../domain/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) { }

  generateToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id.getValue(),
      email: user.getEmail().val,
      role: user.getRole(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
