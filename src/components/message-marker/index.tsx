import React from 'react';
import { LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { MessageDTO } from '../../store/ducks/messages/types';

type Props = {
  message: MessageDTO,
  position: LatLngTuple,
  onLikeClick(message: MessageDTO): void,
  likesCount: number,
};

const useStyle = makeStyles(theme => ({
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  likeButton: {
    marginTop: 8,
    padding: 0,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
  },
  likeIcon: {
    width: 16,
    height: 16,
    cursor: 'pointer',
    fill: '#828282',
    '&:hover': {
      fill: '#42648b',
    },
  },
}));

export const MessageMarker: React.FC<Props> = ({ message, position, onLikeClick, likesCount }) => {
  const classes = useStyle();

  const handleLikeClick = React.useCallback(() => onLikeClick(message), [message, onLikeClick]);

  return (
    <Marker position={position}>
      <Popup>
        <div className={classes.messageContainer}>
          <span>{message.message}</span>
          <button type="button" onClick={handleLikeClick} className={classes.likeButton}>
            <FavoriteBorderOutlinedIcon className={classes.likeIcon} />
            <span>{likesCount}</span>
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
