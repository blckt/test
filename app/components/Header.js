import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const { app } = require('electron').remote;


const Settings = (props) => (
  <IconMenu
    {...props} iconButtonElement={<IconButton > <MoreVertIcon /> </IconButton>} targetOrigin={{
      horizontal: 'right',
      vertical: 'top'
    }} anchorOrigin={{
      horizontal: 'right',
      vertical: 'top'
    }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Exit" onClick={props.handleExit} />
  </IconMenu>
);

Settings.propTypes = {
  handleExit: PropTypes.func.isRequired
};

export class Header extends Component {
  state = {
    yo: 1
  }
  handleChange = (event, logged) => {
    this.setState({ logged });
  };
  handleExit = () => {
    const x = confirm('Are you sure?');
    if (x) {
      app.exit();
    }
  }
  render() {
    return (
      <AppBar
        title="Capture!" showMenuIconButton={false} iconElementRight={<Settings
          handleExit={
            this.handleExit
          }
        />}
      />
    );
  }
}
