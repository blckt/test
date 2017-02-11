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

  <IconMenu {...props} iconButtonElement={<IconButton> <ExitIcon /> </IconButton>} targetOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }} anchorOrigin={{
    horizontal: 'right',
    vertical: 'top'
  }}>
    <MenuItem primaryText="Exit" leftIcon={<NavigationClose />} onClick={props.handleExit} />

  </IconMenu>
);

Settings.propTypes = {
  handleExit: PropTypes.func.isRequired
};

export class Header extends Component {

  constructor(props) {
    super(props);
  }
  handleExit = () => {
    var x = confirm("Are you sure?")
    if (x) {
      app.exit();
    }
  }
  render() {
    return (

      <AppBar style={{ minHeight: '64px' }} title={this.props.title || "App title not provided"} showMenuIconButton={false} iconElementRight={<Settings handleExit={
        this.handleExit
      } />} />

    );
  }
}
