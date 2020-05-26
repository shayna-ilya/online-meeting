import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../store/ducks/users/actions';
import { getUserEmail, getUserName } from '../../store/ducks/users/selectors';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
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
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const userName = useSelector(getUserName);
  const [emailFieldValue, setEmailFieldValue] = useState(email || '');
  const [userNameFieldValue, setUserNameFieldValue] = useState(userName || '');
  const [emailFieldValueHasError, setEmailFieldValueHasError] = useState();
  const [userNameFieldValueHasError, setUserNameFieldValueHasError] = useState();

  const isValidEmail = () => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailFieldValue);

  const isValidUserName = () => !!userNameFieldValue;

  const handleEmailFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFieldValue(event.target.value);
  }, []);

  const handleUsernameFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameFieldValue(event.target.value);
  }, []);

  const handleSendButtonClick = () => {
    if (isValidUserName() && isValidEmail()) {
      dispatch(setUserData(userNameFieldValue, emailFieldValue));
      onClose();
    }

    setEmailFieldValueHasError(!isValidEmail());
    setUserNameFieldValueHasError(!isValidUserName());
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
        <form className={classes.form} action="" autoComplete="off">
          <TextField
            error={emailFieldValueHasError}
            label="Email"
            value={emailFieldValue}
            onChange={handleEmailFieldChange}
            variant="outlined"
            defaultValue={email || ''}
          />
          <TextField
            error={userNameFieldValueHasError}
            label="Username"
            value={userNameFieldValue}
            onChange={handleUsernameFieldChange}
            variant="outlined"
            className={classes.usernameField}
            defaultValue={userName || ''}
          />
          <Button className={classes.sendButton} variant="contained" color="primary" onClick={handleSendButtonClick}>
            Отправить
          </Button>
        </form>
      </Modal>
    </div>
  );
};
