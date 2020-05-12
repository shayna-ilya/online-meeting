import React from 'react';
import { Map, TileLayer, ZoomControl, CircleMarker, useLeaflet, LeafletContext, Marker, Popup } from 'react-leaflet';
import Control from 'react-leaflet-control';
import ReactLeafletSearch from 'react-leaflet-search';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Fab } from '@material-ui/core';
import { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { getAddNewMessageMarkerCoordinates } from '../../store/ducks/messages/selectors';
import { setNewMessageMarkerCoordinates } from '../../store/ducks/messages/actions';

const MapContextRef: React.ForwardRefExoticComponent<any> = React.forwardRef((props, ref) => {
  const leaflet = useLeaflet();
  React.useImperativeHandle(ref, () => ({ ...leaflet }));
  return <></>;
});

const mapCenter: LatLngTuple = [55.751999, 37.617734];

export const MapView: React.FC = () => {
  const [userPosition, setUserPosition] = React.useState<LatLngTuple | undefined>();
  const map = React.useRef<LeafletContext>();
  const addMessageMarker = useSelector(getAddNewMessageMarkerCoordinates);
  const dispatch = useDispatch();

  const handleFindMyPositionButtonClick = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        map?.current?.map?.panTo([position.coords.latitude, position.coords.longitude]);
      },
      error => {
        alert(error.message);
      },
    );
  }, [map]);

  const handleMapClick = React.useCallback(
    (e: LeafletMouseEvent) => {
      dispatch(setNewMessageMarkerCoordinates([e.latlng.lat, e.latlng.lng]));
    },
    [dispatch],
  );

  return (
    <Map center={mapCenter} zoom={8} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="topleft" />
      <ReactLeafletSearch zoom={10} position="topleft" />
      {userPosition && <CircleMarker radius={20} center={userPosition} />}
      {addMessageMarker && (
        <Marker position={addMessageMarker}>
          <Popup>
            <span>Popup</span>
          </Popup>
        </Marker>
      )}
      <Control position="bottomright">
        <Fab onClick={handleFindMyPositionButtonClick} color="secondary" aria-label="edit">
          <NavigationIcon />
        </Fab>
      </Control>
      <MapContextRef ref={map} />
    </Map>
  );
};
