import React from 'react';
import {AppBar, Button, Divider, Drawer, List, ListItem, Toolbar,} from '@material-ui/core';
import {Link} from "react-router-dom";
import {Menu as MenuIcon,} from "@material-ui/icons";

export default function Header() {
  const [state, setState] = React.useState({drawer: false,});
  const toggleDrawer = (open) => () => {
    setState({'drawer': open,});
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={toggleDrawer(true)}
            color="inherit"
            startIcon={<MenuIcon />}
          >
            Menu
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={state['drawer']} onClose={toggleDrawer(false)}>
        <div style={{width: 250,}} onClick={toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/">Home</ListItem>
            <ListItem button component={Link} to="/tdu">TDU</ListItem>
            <ListItem button component={Link} to="/valves">Valves</ListItem>
            <ListItem button component={Link} to="/converter">Converter</ListItem>
          </List>
          <Divider/>
          <List>
            <ListItem button component={Link} to="/contact">Contact me</ListItem>
          </List>
        </div>
      </Drawer>

    </div>
  );
}