import { IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/validators/is-unique';

export class CreatePostDto {
  @IsUnique({ entity: 'post' })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
