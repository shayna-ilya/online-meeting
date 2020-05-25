import { Store } from '../index';

export const getUserName = ({ user }: Store) => {
  console.log(user, 'user');
  console.log(user.email, 'user.email');
  console.log(user.userName, 'user.userName');
  return user.userName;
};
export const getUserEmail = ({ user }: Store) => user.email;
