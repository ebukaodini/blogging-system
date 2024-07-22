import { Injectable } from '@nestjs/common';
import { generate, verify } from 'password-hash';

@Injectable()
export class PasswordService {
  hashPassword(password: string): string {
    return generate(password, { saltLength: 10 });
  }

  verifyPasswordHash(password: string, passwordHash: string): boolean {
    return verify(password, passwordHash);
  }
}
