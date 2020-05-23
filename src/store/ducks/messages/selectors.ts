import { Store } from '../index';

export const getAddNewMessageMarkerCoordinates = ({ messages }: Store) => messages.addNewMessageMarkerCoordinates;
export const getAllMessages = ({ messages }: Store) => messages.messages;
