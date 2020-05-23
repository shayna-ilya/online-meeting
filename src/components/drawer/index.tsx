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
import { useDispatch, useSelector } from 'react-redux';
import { drawerWidth } from '../../constants';
import { addMessage } from '../../store/ducks/messages/actions';
import { getAddNewMessageMarkerCoordinates } from '../../store/ducks/messages/selectors';
import { DrawerMessagesList } from '../drawer-messages-list';

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
  const [fieldHasError, setFieldHasError] = React.useState<boolean>(false);
  const newMessageMarkerCoordinates = useSelector(getAddNewMessageMarkerCoordinates);
  const dispatch = useDispatch();

  const handleMessageFieldChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageFieldValue(event.target.value);
    setFieldHasError(!event.target.value);
  }, []);

  const handleSendButtonPress = React.useCallback(() => {
    if (!messageFieldValue) {
      setFieldHasError(true);
    }

    if (newMessageMarkerCoordinates && !fieldHasError) {
      dispatch(
        addMessage.request({
          email: 'example@vasya.ru',
          message: String(messageFieldValue),
          latitude: newMessageMarkerCoordinates[0],
          longitude: newMessageMarkerCoordinates[1],
        }),
      );
      setMessageFieldValue('');
    }
  }, [dispatch, messageFieldValue, newMessageMarkerCoordinates]);

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
            error={fieldHasError}
            id={fieldHasError ? 'standard-error-helper-text' : 'standard-multiline-flexible'}
            className={classes.messageInput}
            label="Сообщение"
            multiline
            rowsMax={4}
            value={messageFieldValue}
            onChange={handleMessageFieldChange}
            helperText={fieldHasError ? 'Введите сообщение' : ''}
          />
          <Button variant="contained" onClick={handleSendButtonPress} color="primary">
            Отправить
          </Button>
        </div>
        <div>
          <DrawerMessagesList />
        </div>
      </Container>
    </Drawer>
  );
};
