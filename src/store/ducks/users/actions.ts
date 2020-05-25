import { createAction } from 'typesafe-actions';

const PREFIX = '@users';

export const setUserData = createAction(`${PREFIX}/SET_USER_DATA`, (userName: string, email: string) => ({
  userName,
  email,
}))();
