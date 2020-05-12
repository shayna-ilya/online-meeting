import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { MapView } from './components/map';
import { getAddNewMessageMarkerCoordinates } from './store/ducks/messages/selectors';
import { drawerWidth } from './constants';
import { AppDrawer } from './components/drawer';
import { getAllMessages } from './store/ducks/messages/actions';

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const addMessageMarker = useSelector(getAddNewMessageMarkerCoordinates);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllMessages.request());
  }, [dispatch]);

  React.useEffect(() => {
    if (addMessageMarker) {
      setOpen(true);
    }
  }, [addMessageMarker]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ← Принять участие
          </Typography>
        </Toolbar>
      </AppBar>
      <AppDrawer isOpen={open} onClose={handleDrawerClose} />
      <main>
        <MapView />
      </main>
    </div>
  );
};

export default App;
