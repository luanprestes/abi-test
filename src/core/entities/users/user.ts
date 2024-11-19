export type UserEntity = {
  id: number;
  email: string;
  name: string;
  password?: string;
  permission: {
    name: string;
    id: number;
  };
};
