import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { drawerWidth } from '../../constants';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  messagesContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInput: {
    width: '100%',
    marginRight: 20,
  },
}));

type Props = {
  isOpen: boolean,
  onClose(): void,
};

export const AppDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [messageFieldValue, setMessageFieldValue] = React.useState<string>();

  const handleMessageFieldChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageFieldValue(event.target.value);
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <Container maxWidth="sm" className={classes.drawerContainer}>
        <div className={classes.messagesContainer}>
          <TextField
            id="standard-multiline-flexible"
            className={classes.messageInput}
            label="Ваше сообщение"
            multiline
            rowsMax={4}
            value={messageFieldValue}
            onChange={handleMessageFieldChange}
          />
          <Button variant="contained" color="primary">
            Отправить
          </Button>
        </div>
      </Container>
    </Drawer>
  );
};