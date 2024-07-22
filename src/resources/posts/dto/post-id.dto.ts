import { Exists } from 'src/validators/exists';

export class PostIdDto {
  @Exists({ entity: 'post', transform: (v) => Number(v) })
  id: number;
}
