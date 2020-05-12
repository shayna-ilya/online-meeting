import { LatLngTuple } from 'leaflet';

export type MessagesState = {
  addNewMessageMarkerCoordinates?: LatLngTuple,
  messages: MessageDTO[]
};

export type ErrorDTO = {
  statusCode: number;
  message: string[];
  error: string;
};

export type MessageDTO = {
  readonly email: string;
  readonly message: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly createdAt: Date;
  readonly _id: string;
};

export type GetAllMessagesDTO = MessageDTO[] | ErrorDTO;

export type AddMessageRequestDTO = Omit<MessageDTO, '_id' | 'createdAt'>;
