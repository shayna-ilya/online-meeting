import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
      fontSize: 16,
    },
  }),
);

type Props = {
  date: Date,
  description: string,
  userInfo?: string,
};

export const DrawerMessagesListItem: React.FC<Props> = ({ date, description, userInfo }) => {
  const classes = useStyles();

  const getUserInfo = () => userInfo || 'Аноним';

  const renderMessageDate = () => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString('ru-RU', options);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={renderMessageDate()}
        secondary={
          <>
            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
              {getUserInfo()}
            </Typography>
            {` - ${description}`}
          </>
        }
      />
    </ListItem>
  );
};
