import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const { app } = require('electron').remote;


const Settings = (props) => (
<<<<<<< HEAD
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
=======
  <IconMenu {...props} iconButtonElement={<IconButton> <ExitIcon /> </IconButton>} targetOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }} anchorOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}>
    <MenuItem primaryText="Exit" leftIcon={<NavigationClose />} onClick={props.handleExit} />
>>>>>>> 0c49053c8d830b1d3fb39752bd0e2b243b0271d7
  </IconMenu>
);

Settings.propTypes = {
  handleExit: PropTypes.func.isRequired
};

export class Header extends Component {
<<<<<<< HEAD
  state = {
    yo: 1
  }
  handleChange = (event, logged) => {
    this.setState({ logged });
  };
  handleExit = () => {
    const x = confirm('Are you sure?');
=======
  constructor(props) {
    super(props);
  }
  handleExit = () => {
    var x = confirm("Are you sure?")
>>>>>>> 0c49053c8d830b1d3fb39752bd0e2b243b0271d7
    if (x) {
      app.exit();
    }
  }
  render() {
    return (
<<<<<<< HEAD
      <AppBar
        title="Capture!" showMenuIconButton={false} iconElementRight={<Settings
          handleExit={
            this.handleExit
          }
        />}
      />
=======
      <AppBar style={{ minHeight: '64px' }} title={this.props.title || "App title not provided"} showMenuIconButton={false} iconElementRight={<Settings handleExit={
        this.handleExit
      } />} />
>>>>>>> 0c49053c8d830b1d3fb39752bd0e2b243b0271d7
    );
  }
}
