import { Id } from '../../convex/_generated/dataModel';

export type FuncType = 'admin' | 'member' | 'guest';
export type UserItem = {
  _id: Id<'users'>;
  name: string;
  email: string;
  func?: FuncType;
  _creationTime: number;
};
