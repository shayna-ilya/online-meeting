import { combineReducers } from 'redux';
import { MessagesState } from './messages/types';
import { messagesReducer } from './messages/reducers';
import * as messagesActions from './messages/actions';

export type Store = {
  messages: MessagesState,
};

export const rootReducer = combineReducers<Store>({
  messages: messagesReducer,
});

export const rootAction = {
  messages: messagesActions,
};
