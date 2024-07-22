import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: Pick<User, 'username' | 'passwordHash'>) {
    try {
      const result = await this.prismaService.user.create({ data: user });
      if (result) {
        // remove the password from the response
        delete result.passwordHash;

        return result;
      } else throw new BadRequestException('Could not register user');
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { username },
      });

      if (user) {
        return user;
      } else throw new BadRequestException('User not found');
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}
