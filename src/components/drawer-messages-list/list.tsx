import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MaterialList from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { MessageDTO } from '../../store/ducks/messages/types';
import { DrawerMessagesListItem } from './list-item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

type Props = {
  messages: MessageDTO[],
};

export const List: React.FC<Props> = ({ messages }) => {
  const classes = useStyles();

  return (
    <MaterialList className={classes.root}>
      {messages.map((messageItem, index) => {
        return (
          /* eslint-disable-next-line no-underscore-dangle */
          <div key={messageItem._id}>
            <DrawerMessagesListItem
              date={messageItem.createdAt}
              description={messageItem.message}
              userEmail={messageItem.email}
            />
            {index !== messages.length - 1 && <Divider variant="inset" component="li" />}
          </div>
        );
      })}
    </MaterialList>
  );
};
