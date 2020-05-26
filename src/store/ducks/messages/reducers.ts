import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { MessagesState } from './types';
import { addLike, addMessage, getAllMessages, setNewMessageMarkerCoordinates } from './actions';

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
  )
  .handleAction(addLike.success, (state, action) =>
    produce(state, draft => {
      const index = draft.messages.findIndex(message => {
        // eslint-disable-next-line no-underscore-dangle
        return message._id === action.payload._id;
      });
      draft.messages[index] = action.payload;
    }),
  );
