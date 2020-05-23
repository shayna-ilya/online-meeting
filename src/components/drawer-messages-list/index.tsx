import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';
import { List } from './list';
import { getAllMessages } from '../../store/ducks/messages/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      flexGrow: 1,
    },
    listWrapper: {
      marginTop: 24,
    },
    tabsWrapper: {
      marginTop: 24,
    },
  }),
);

export const DrawerMessagesList: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const allMessages = useSelector(getAllMessages);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tabsWrapper}>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Последние" />
            <Tab label="Популярные" />
            <Tab label="Мои" />
          </Tabs>
        </div>
      </Paper>
      <div className={classes.listWrapper}>
        <List messages={allMessages} />
      </div>
    </>
  );
};
