import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/ducks/users/actions';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    minWidth: 400,
    padding: '48px 32px',
  },
  usernameField: {
    marginTop: 32,
  },
  sendButton: {
    maxWidth: 160,
    marginTop: 24,
    alignSelf: 'center',
  },
}));

type Props = {
  isOpen: boolean,
  onClose(): void,
};

export const SignInModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [emailFieldValue, setEmailFieldValue] = useState();
  const [usernameFieldValue, setUsernameFieldValue] = useState();
  const [emailFieldHasError, setEmailFieldHasError] = useState(false);
  const [usernameFieldHasError, setUsernameFieldHasError] = useState(false);
  const dispatch = useDispatch();

  const handleEmailFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFieldValue(event.target.value);
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
      setEmailFieldHasError(true);
    } else {
      setEmailFieldHasError(false);
    }
  }, []);

  const handleUsernameFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameFieldValue(event.target.value);
    if (!event.target.value) {
      setUsernameFieldHasError(true);
    } else {
      setUsernameFieldHasError(false);
    }
  }, []);

  const handleSendButtonClick = () => {
    dispatch(setUserData(usernameFieldValue, emailFieldValue));
    onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <TextField
            error={emailFieldHasError}
            label="Email"
            value={emailFieldValue}
            onChange={handleEmailFieldChange}
            rowsMax={4}
            variant="outlined"
          />
          <TextField
            error={usernameFieldHasError}
            label="Username"
            value={usernameFieldValue}
            onChange={handleUsernameFieldChange}
            rowsMax={4}
            variant="outlined"
            className={classes.usernameField}
          />
          <Button
            disabled={usernameFieldHasError || emailFieldHasError}
            className={classes.sendButton}
            variant="contained"
            color="primary"
            onClick={handleSendButtonClick}
          >
            Отправить
          </Button>
        </div>
      </Modal>
    </div>
  );
};
