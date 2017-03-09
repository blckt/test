import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import MusicVideo from 'material-ui/svg-icons/av/music-video';
import CaptureScreen from 'material-ui/svg-icons/av/video-label'
import Settings from 'material-ui/svg-icons/action/settings-applications';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
//const captureScreen = <FontIcon className="material-icons">C</FontIcon>;
const settings = <Settings />;
const captureScreen = <CaptureScreen />;
const musicVideo = <MusicVideo />;


function mapStateToProps(state) {
  return {
    nav: state.nav
  };
}


class BottomNavigationExampleSimple extends Component {
  state = {
    selectedIndex: 0,
    router: null
  };

  componentWillMount() {
    const {router,nav} = this.props

 this.updateActive(nav)
    this.setState({ router })
  }

  select = (index, url) => {
    this.setState({ selectedIndex: index })
    this.state.router.push(url);
  };

updateActive=(url)=>{
  let ind = url ==='/'? 0:url==='/screen'?1:2;
  this.setState({selectedIndex:ind});
}
  componentWillReceiveProps(newPrp){
   this.updateActive(newPrp.nav)
  }
  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Screens"
            icon={musicVideo}
            onTouchTap={() => this.select(0, "/")}
          />
          <BottomNavigationItem
            label="Capture"
            icon={captureScreen}
            onTouchTap={() => this.select(1, "screen")}
          />
          <BottomNavigationItem
            label="Settings"
            icon={settings}
            onTouchTap={() => this.select(2, "settings")}
          />

        </BottomNavigation>
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(withRouter(BottomNavigationExampleSimple));
