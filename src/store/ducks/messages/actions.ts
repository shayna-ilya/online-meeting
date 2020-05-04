import { createAction } from 'typesafe-actions';
import { LatLngExpression } from 'leaflet';

const PREFIX = '@messages';

export const setNewMessageMarkerCoordinates = createAction(
  `${PREFIX}/SET_NEW_MESSAGE_MARKER_COORDINATES`,
  (value: LatLngExpression | undefined) => value,
)<LatLngExpression | undefined>();
