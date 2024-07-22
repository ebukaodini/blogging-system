import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsUnique } from 'src/validators/is-unique';

export class CreateUserDto {
  @IsNotEmpty()
  @IsUnique({ entity: 'user' })
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
