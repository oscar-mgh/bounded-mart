import { Email } from 'shared/domain/value-objects/email.vo';
import { Id } from 'src/shared/domain/value-objects/id.vo';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export class User {
  constructor(
    public readonly id: Id,
    private username: string,
    private email: Email,
    private password: string,
    private role: UserRole = UserRole.CUSTOMER,
    private active: boolean = true,
  ) {
    if (username.length < 4 || username.length > 40)
      throw new Error('Invalid username');
    if (!email.val.includes('@')) throw new Error('Invalid email');
  }
}
