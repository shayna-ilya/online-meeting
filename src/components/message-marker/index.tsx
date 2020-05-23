import React from 'react';
import { LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import makeStyles from '@material-ui/core/styles/makeStyles';

type Props = {
  message: string,
  position: LatLngTuple,
  onLikeClick(): void,
};

const useStyle = makeStyles(theme => ({
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  likeButtonWrapper: {
    marginTop: 8,
    padding: 0,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
  },
  likeButton: {
    width: 16,
    height: 16,
    cursor: 'pointer',
    fill: '#828282',
    '&:hover': {
      fill: '#42648b',
    },
  },
}));

export const MessageMarker: React.FC<Props> = props => {
  const { message, position, onLikeClick } = props;
  const classes = useStyle();

  return (
    <Marker position={position}>
      <Popup>
        <div className={classes.messageContainer}>
          <span>{message}</span>
          <button type="button" onClick={onLikeClick} className={classes.likeButtonWrapper}>
            <FavoriteBorderOutlinedIcon className={classes.likeButton} />
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
