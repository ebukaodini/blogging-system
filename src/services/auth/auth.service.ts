import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtHeader, JwtPayload, SignOptions } from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private accessTokenExpiresIn = '30m';

  constructor(private readonly prismaService: PrismaService) {}

  async generateAccessToken(userId: number) {
    try {
      const token = jwt.sign(
        {
          user: userId,
        } as JwtPayload,
        process.env.JWT_SECRET!,
        {
          header: { alg: 'HS256', typ: 'JWT' } as JwtHeader,
          expiresIn: this.accessTokenExpiresIn,
        } as SignOptions,
      );

      // update the user's token in the database
      await this.prismaService.user.update({
        where: { id: userId },
        data: { token },
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  async verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
    try {
      return this.prismaService.user
        .findFirst({ where: { token } })
        .then((result) => {
          if (result)
            return jwt.verify(
              result.token,
              process.env.JWT_SECRET!,
            ) as JwtPayload;
          else throw new Error('Invalid token');
        });
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
