import { Store } from '../index';

export const getUserName = ({ user }: Store) => user.userName;
export const getUserEmail = ({ user }: Store) => user.email;
