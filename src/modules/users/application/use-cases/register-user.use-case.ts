import { ConflictException, Injectable } from '@nestjs/common';
import { Email } from 'src/modules/users/domain/value-objects/email.vo';
import { Id } from '../../../shared/domain/value-objects/id.vo';
import { User, UserRole } from '../../domain/entities/user.entity';
import { PasswordHasherPort } from '../../domain/ports/password-hasher.port';
import { UserRepositoryPort } from '../../domain/ports/user-repository.port';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hasher: PasswordHasherPort,
  ) { }

  async execute(dto: RegisterUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('User already exists');

    const hashedPassword = await this.hasher.hash(dto.password);

    const newUser = new User(
      Id.create(),
      dto.username,
      new Email(dto.email),
      hashedPassword,
      UserRole.CUSTOMER,
    );

    await this.userRepository.save(newUser);

    return newUser;
  }
}
