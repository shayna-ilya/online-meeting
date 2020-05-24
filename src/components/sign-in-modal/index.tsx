import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    minWidth: 400,
  },
  field: {
    marginTop: 8,
    marginBottom: 8,
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

  const handleEmailFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFieldValue(event.target.value);
  }, []);

  const handleUsernameFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameFieldValue(event.target.value);
  }, []);

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
            label="Email"
            value={emailFieldValue}
            onChange={handleEmailFieldChange}
            rowsMax={4}
            className={classes.field}
          />
          <TextField
            label="Nickname"
            value={usernameFieldValue}
            onChange={handleUsernameFieldChange}
            rowsMax={4}
            className={classes.field}
          />
        </div>
      </Modal>
    </div>
  );
};
