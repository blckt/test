// @flow
import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


import { Card, CardMedia, FlatButton, CardActions } from 'material-ui'

import * as actions from '../../actions/screen'


import VideoPlayer from './VideoPlayer';
import AudioVisualizer from './AudioVisualizer';
import { initPreview } from './utils/stream'

import styles from './styles.css';


const webCamConstraits = {
  audio: true,
  video: false
};


const videoCaptureOptions = (id, customWidth, customHeight) => {
  const { width, height } = screen;
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
  static propTypes = {
    screens: PropTypes.arrayOf(Object).isRequired,
    installVideoRecorder: PropTypes.func.isRequired,
    startVideoCapture: PropTypes.func.isRequired,
    stopVideoCapturing: PropTypes.func.isRequired
  }

  state = {
    currentScreen: {},
    stream: null,
    webCam: null
  }
  componentWillMount() {
    const { screens: { currentScreen } } = this.props;
    this.setState({
      currentScreen
    })
  }

  componentDidMount() {
    this.showPreview(this.state.currentScreen.id)
  }

  showPreview = async (id) => {
    let stream;
    let webCam;
    try {
      stream = await initPreview(videoCaptureOptions(id))
    } catch (e) {
      console.log(e);
      new Notification('Error', {
        body: e.message
      });
    }

    try {
      webCam = await initPreview(webCamConstraits);
    }
    catch (ex) {
      new Notification('Error', {
        body: ex.message
      });
    }
    if (webCam) {
      const tracks = webCam.getAudioTracks();
      if (tracks[0]) {
        stream.addTrack(tracks[0]);
      }
    }

    this.props.installVideoRecorder(stream, webCam);
    this.setState({ stream, webCam });
  }

  render() {
    return (
      <Card>
        <CardMedia className={styles['video-container']}>
          {(() => {
            if (this.state.stream) {
              return (<div style={{ display: 'flex', flexDirection: 'column' }}>
                <VideoPlayer src={this.state.stream} />
                <AudioVisualizer stream={this.state.stream} />
                {(() => {
                  if (this.state.webCam && this.state.webCam.getAudioTracks()[0]) {
                    <AudioVisualizer stream={this.state.stream} />
                  }
                })()}
              </div>)
            }
          })()}
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
