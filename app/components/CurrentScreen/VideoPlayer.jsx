import React, { Component, PropTypes } from 'react'

import styles from './styles.css';

let x = 0;

export default class Player extends Component {
  static propTypes = {
    src: PropTypes.instanceOf(Object).isRequired,
  }
  state = {
    video: null,
    src: '',
    videoStream: null
  }
  componentDidMount() {
    this.addVideoSrc(this.props.src);
  }
  setRef = (src) => {
    const video = this.video;
    if (video) {
      video.muted = true;
      this.setState({
        video
      })
      this.addVideoSrc(src)
    }
  }
  addVideoSrc = (stream) => {
    if (stream && !this.state.src) {
      const url = URL.createObjectURL(stream)
      this.setState({
        src: url
      })
      this.setRef(this.state.src);
    }
  }

  render() {
    if (this.state.src) {
      return <video className={styles['video-box']} src={this.state.src} autoPlay ref={(_c) => { this.video = _c }} muted></video>
    } else {
      return <div>Loading...</div>
    }
  }
}
