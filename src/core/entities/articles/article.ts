import { UserEntity } from '../users/user';

export type Article = {
  id: number;
  title: string;
  content: string;
  creator: UserEntity;
};
