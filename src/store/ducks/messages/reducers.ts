import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { MessagesState } from './types';
import { setNewMessageMarkerCoordinates } from './actions';

const initialState: MessagesState = {
  addNewMessageMarkerCoordinates: undefined,
};

export const messagesReducer = createReducer(initialState).handleAction(
  setNewMessageMarkerCoordinates,
  (state, action) =>
    produce(state, draft => {
      draft.addNewMessageMarkerCoordinates = action.payload;
    }),
);
