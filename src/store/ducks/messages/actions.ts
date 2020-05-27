import { createAction, createAsyncAction } from 'typesafe-actions';
import { LatLngTuple } from 'leaflet';
import { AddLikeRequestDTO, AddMessageRequestDTO, GetAllMessagesDTO, MessageDTO } from './types';

const PREFIX = '@messages';

export const setNewMessageMarkerCoordinates = createAction(
  `${PREFIX}/SET_NEW_MESSAGE_MARKER_COORDINATES`,
  (value: LatLngTuple | undefined) => value,
)<LatLngTuple | undefined>();

export const addMessage = createAsyncAction(
  `${PREFIX}/ADD_MESSAGE_REQUEST`,
  `${PREFIX}/ADD_MESSAGE_SUCCESS`,
  `${PREFIX}/ADD_MESSAGE_FAILURE`,
)<AddMessageRequestDTO, MessageDTO, Error>();

export const getAllMessages = createAsyncAction(
  `${PREFIX}/GET_ALL_MESSAGES_REQUEST`,
  `${PREFIX}/GET_ALL_MESSAGES_SUCCESS`,
  `${PREFIX}/GET_ALL_MESSAGES_FAILURE`,
)<undefined, MessageDTO[], Error>();

export const addLike = createAsyncAction(
  `${PREFIX}/ADD_LIKE_REQUEST`,
  `${PREFIX}/ADD_LIKE_SUCCESS`,
  `${PREFIX}/ADD_LIKE_FAILURE`,
)<AddLikeRequestDTO, MessageDTO, Error>();
