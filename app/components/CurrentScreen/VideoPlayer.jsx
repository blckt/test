import React, { Component, PropTypes } from 'react'

import styles from './styles.css';


export default class Player extends Component {
  static propTypes = {
    src: PropTypes.any.isRequired
  }
  state = {
    video: null,
    src: ''
  }
  componentWillReceiveProps(props) {
    const {src} = props;
    this.addVideoSrc(src);
  }
  componentDidMount() {

  }
  setRef = (src) => {
    const {video} = this.refs;
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
      return <video className={styles['video-box']} src={this.state.src} autoPlay ref="video" muted></video>
    } else {
      return <div>Loading...</div>
    }
  }
}
