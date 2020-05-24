import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch, useSelector } from 'react-redux';
import { MapView } from './components/map';
import { getAddNewMessageMarkerCoordinates } from './store/ducks/messages/selectors';
import { drawerWidth } from './constants';
import { AppDrawer } from './components/drawer';
import { getAllMessages } from './store/ducks/messages/actions';
import { Putin } from './components/putin';
import { DollarRate } from './components/dollar-rate';
import { SignInModal } from './components/sign-in-modal';

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  profileButton: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const App = () => {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = React.useState(false);
  const addMessageMarker = useSelector(getAddNewMessageMarkerCoordinates);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllMessages.request());
  }, [dispatch]);

  React.useEffect(() => {
    if (addMessageMarker) {
      setDrawerIsOpen(true);
    }
  }, [addMessageMarker]);

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  const handleSignInModalOpen = () => {
    setSignInModalIsOpen(true);
  };

  const handleSignInModalClose = () => {
    setSignInModalIsOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerIsOpen,
        })}
      >
        <div className={classes.appBarContainer}>
          <Toolbar>
            <PersonIcon className={classes.profileButton} onClick={handleSignInModalOpen} />
            <Typography variant="h6" noWrap>
              ← Принять участие
            </Typography>
          </Toolbar>
          <Putin />
          <DollarRate />
        </div>
      </AppBar>
      <AppDrawer isOpen={drawerIsOpen} onClose={handleDrawerClose} />
      <SignInModal isOpen={signInModalIsOpen} onClose={handleSignInModalClose} />
      <main>
        <MapView />
      </main>
    </div>
  );
};

export default App;
