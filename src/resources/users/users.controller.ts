import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from 'src/services/password/password.service';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body() userDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = {
        username: userDto.username,
        // hash the user password
        passwordHash: this.passwordService.hashPassword(userDto.password),
      };

      return this.userService.createUser(user).then(async (result) => {
        // generate the jwt auth token
        const token = await this.authService.generateAccessToken(result.id);

        return res.status(HttpStatus.CREATED).json({
          message: 'User created successfully',
          data: { user: result, authToken: token },
        });
      });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.userService.findUserByUsername(loginDto.username);

      if (user) {
        const isMatch = this.passwordService.verifyPasswordHash(
          loginDto.password,
          user.passwordHash,
        );

        if (isMatch) {
          const token = await this.authService.generateAccessToken(user.id);
          return res
            .status(HttpStatus.OK)
            .json({ message: 'Login successful', data: { token } });
        } else {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: 'Invalid credentials' });
        }
      }
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
