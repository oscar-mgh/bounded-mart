import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { PasswordHasherPort } from '../../domain/ports/password-hasher.port';
import { UserRepositoryPort } from '../../domain/ports/user-repository.port';
import { LoginDto } from '../../infrastructure/http/dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hasher: PasswordHasherPort,
  ) {}

  async execute(dto: LoginDto): Promise<User> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hasher.compare(dto.password, user.getPassword());

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive()) {
      throw new UnauthorizedException('User account is disabled');
    }

    return user;
  }
}
