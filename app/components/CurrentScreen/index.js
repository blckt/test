import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/screen.js'

import { Card, CardMedia, CardTitle, CardHeader, FlatButton, CardActions } from 'material-ui'

import VideoPlayer from './VideoPlayer.jsx';
import { initPreview } from './utils/stream.js'

import styles from './styles.css';



const videoCaptureOptions = (id, customWidth, customHeight) => {
  const {width, height} = screen;
  return {
    audio: {
      mandatory: {
        chromeMediaSource: 'desktop'
      }
    },
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: id,
        minWidth: customWidth || width,
        maxWidth: customWidth || width,
        minHeight: customHeight || height,
        maxHeight: customHeight || height,
      },
      optional:
      [
        { frameRate: 60 },
      ]
    }
  }
}

function mapStateToProps(state) {
  return {
    screens: state.screen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


class AllScreens extends Component {
  state = {
    currentScreen: {},
    stream: null
  }

  componentWillMount() {
    const {screens: {currentScreen}} = this.props;
    this.setState({
      currentScreen
    })
  }

  componentDidMount() {
    this.showPreview(this.state.currentScreen.id)
  }

  showPreview = async (id) => {
    let stream;
    try {
      stream = await initPreview(videoCaptureOptions(id))
      this.setState({ stream });
      this.props.installVideoRecorder(this.state.stream);
    }
    catch (e) {
      console.log(e);
      alert(e.message)
    }
  }

  render() {
    return (
      <Card>
        <CardMedia className={styles['video-container']}>
          <VideoPlayer src={this.state.stream} />
        </CardMedia>
        <CardActions>
          <FlatButton label="Capture" onClick={() => { this.props.startVideoCapture() }} />
          <FlatButton label="StopVideoCapture" onClick={() => { this.props.stopVideoCapturing() }} />
        </CardActions>
      </Card>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllScreens)
