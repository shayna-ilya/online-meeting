import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { MessagesState } from './messages/types';
import { messagesReducer } from './messages/reducers';
import * as messagesActions from './messages/actions';
import * as usersActions from './users/actions';
import { watchMessagesSagas } from './messages/sagas';
import { userReducer } from './users/reducers';
import { UsersState } from './users/types';

export type Store = {
  messages: MessagesState,
  user: UsersState,
};

export const rootReducer = combineReducers<Store>({
  messages: messagesReducer,
  user: userReducer,
});

export const rootAction = {
  messages: messagesActions,
  user: usersActions,
};

export function* rootSaga() {
  yield all([watchMessagesSagas()]);
}
