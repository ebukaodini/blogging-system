import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthService } from 'src/services/auth/auth.service';
import { PasswordService } from 'src/services/password/password.service';
import { PasswordModule } from 'src/services/password/password.module';
import { AuthModule } from 'src/services/auth/auth.module';

@Module({
  imports: [PrismaModule, PasswordModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PasswordService, AuthService],
})
export class UsersModule {}
