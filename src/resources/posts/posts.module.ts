import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthModule } from 'src/services/auth/auth.module';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, AuthService],
})
export class PostsModule {}
