import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { UsersState } from './types';
import { setUserData } from './actions';

const initialState: UsersState = {
  email: undefined,
  userName: undefined,
};

export const usersReducer = createReducer(initialState).handleAction(setUserData, (state, action) =>
  produce(state, draft => {
    draft.email = action.payload.email;
    draft.userName = action.payload.userName;
  }),
);
