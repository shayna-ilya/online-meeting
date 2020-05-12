import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { MessagesState } from './messages/types';
import { messagesReducer } from './messages/reducers';
import * as messagesActions from './messages/actions';
import { watchMessagesSagas } from './messages/sagas';

export type Store = {
  messages: MessagesState,
};

export const rootReducer = combineReducers<Store>({
  messages: messagesReducer,
});

export const rootAction = {
  messages: messagesActions,
};

export function* rootSaga() {
  yield all([watchMessagesSagas()]);
}
