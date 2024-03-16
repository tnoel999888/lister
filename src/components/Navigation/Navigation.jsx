import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { block } from 'bem-cn';
import './navigation.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CSS_BLOCK_NAME = 'navigation';
const blk = block(CSS_BLOCK_NAME);

function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={blk()}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Films" />
          <Tab label="TV Shows" />
          <Tab label="Books" />
          <Tab label="Restaurants" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default Navigation;
