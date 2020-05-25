import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { MessagesState } from './types';
import { addMessage, getAllMessages, setNewMessageMarkerCoordinates } from './actions';

const initialState: MessagesState = {
  addNewMessageMarkerCoordinates: undefined,
  messages: [],
};

export const messagesReducer = createReducer(initialState)
  .handleAction(setNewMessageMarkerCoordinates, (state, action) =>
    produce(state, draft => {
      draft.addNewMessageMarkerCoordinates = action.payload;
    }),
  )
  .handleAction(getAllMessages.success, (state, action) =>
    produce(state, draft => {
      draft.messages = action.payload;
    }),
  )
  .handleAction(addMessage.success, (state, action) =>
    produce(state, draft => {
      draft.messages.unshift(action.payload);
    }),
  );
