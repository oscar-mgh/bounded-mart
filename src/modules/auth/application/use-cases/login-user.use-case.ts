import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { PasswordHasherPort } from '../../domain/ports/password-hasher.port';
import { UserRepositoryPort } from '../../domain/ports/user-repository.port';
import { LoginCommand } from './commands/login-user.command';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hasher: PasswordHasherPort,
  ) {}

  async execute(command: LoginCommand): Promise<User> {
    const { email, password } = command;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hasher.compare(password, user.getPassword());

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive()) {
      throw new UnauthorizedException('User account is disabled');
    }

    return user;
  }
}
