export interface IRole {
  id: number;
  role: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  HR = 'HR',
}
