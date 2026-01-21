import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasherPort } from '../../domain/ports/password-hasher.port';

@Injectable()
export class BcryptHasher implements PasswordHasherPort {
  private readonly SALTS = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALTS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
