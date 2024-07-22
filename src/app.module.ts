import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { PasswordService } from './services/password/password.service';
import { PasswordModule } from './services/password/password.module';
import { AuthModule } from './services/auth/auth.module';
import { PostsModule } from './resources/posts/posts.module';

@Module({
  imports: [UsersModule, PasswordModule, AuthModule, PostsModule],
  controllers: [],
  providers: [PasswordService],
})
export class AppModule {}
