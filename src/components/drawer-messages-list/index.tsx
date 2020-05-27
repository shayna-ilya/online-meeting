import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { List } from './list';
import { getAllMessages } from '../../store/ducks/messages/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listWrapper: {
      marginTop: 24,
    },
  }),
);

export const DrawerMessagesList: React.FC = () => {
  const classes = useStyles();
  const allMessages = useSelector(getAllMessages);

  return (
    <>
      <div className={classes.listWrapper}>
        <List messages={allMessages} />
      </div>
    </>
  );
};
