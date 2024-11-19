import { User } from 'src/modules/users/dtos/user.dto';

export type Article = {
  id: number;
  title: string;
  content: string;
  creator: User;
  creatorId?: number;
};
