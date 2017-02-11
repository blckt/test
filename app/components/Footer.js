import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

export class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<BottomNavigation>
        Hello mir!
    </BottomNavigation>);
  }
}
