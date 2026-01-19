import { UserRole } from '../../domain/entities/user.entity';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  active: boolean;

  static fromDomain(user: any): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id.getValue();
    dto.username = user.getUsername();
    dto.email = user.getEmail().val;
    dto.role = user.getRole();
    dto.active = user.isActive();
    return dto;
  }
}
