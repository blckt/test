import React, { PropTypes } from 'react';

let WIDTH;
let HEIGHT;

type props = {
  stream: Object,
  source: MediaStreamAudioSourceNode,
  analyzer: AnalyserNode,
  dataArray: Uint8Array,
  canvasCtx: CanvasRenderingContext2D
};

export default class AudioVisualizer extends React.Component {
  static propTypes = {
    stream: PropTypes.instanceOf(Object).isRequired
  }
  state: props = {
    stream: props.stream,
    source: null,
    analyzer: null,
    drawVisual: null,
    canvasCtx: null,
    dataArray: null
  }
  componentWillMount() {
    if (this.props.stream.getAudioTracks()[0]) {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(this.props.stream);
      const analyzer = audioCtx.createAnalyser();
      source.connect(analyzer);

      var biquadFilter = audioCtx.createBiquadFilter();
      biquadFilter.type = "lowshelf";
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 55;
      analyzer.connect(biquadFilter);
      //x
      //biquadFilter.connect(audioCtx.destination);
      this.setState({ source, analyzer });
    }
  }
  componentDidMount() {
    console.log(this);
    this.visualize();
  }

  visualize = () => {
    WIDTH = this.canvas.width;
    HEIGHT = this.canvas.height;
    const canvas: HTMLCanvasElement = this.canvas;
    const analyzer: AnalyserNode = this.state.analyzer;
    analyzer.fftsize = 2048;
    const bufferLenght = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLenght);
    this.setState({ dataArray });
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    this.setState({ canvasCtx })
    this.draw();
  }
  draw = () => {
    const drawVisual = requestAnimationFrame(this.draw);
    const analyzer: AnalyserNode = this.state.analyzer;
    const dataArray: Uint8Array = this.state.dataArray;
    const canvasCtx: CanvasRenderingContext2D = this.state.canvasCtx;
    analyzer.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();
    const widthDouble = WIDTH * 1.0;
    const sliceWidth = widthDouble / analyzer.fftSize;
    let x = 0;
    const semiHeight = HEIGHT / 2;
    for (let i = 0; i < analyzer.fftSize; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * semiHeight;
      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      x += sliceWidth * 1.75;
    }
    canvasCtx.lineTo(WIDTH, HEIGHT / 2);
    canvasCtx.stroke();
  }
  render() {
    return (<canvas width="100%" height="35px" ref={(_e) => { this.canvas = _e }} />)
  }
}
