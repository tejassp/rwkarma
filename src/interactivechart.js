import React from 'react';
import Chart from 'chart.js';
import { lineChartData }  from './datasource';
import zoomPlugin from './zoomplugin';

import resize from './resize.png';

var counter = 0;

class InteractiveChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasID = 'canvas_id_' + counter++;
    this.containerID = 'container_id_' + counter++;
    this.scaleCanvasID = 'scale_chart_id_' + counter++;

    this.chart = null; // chart being drawn

    this.state = {
      height: 420,
      width: 420
    };
    this.scaleHeight = 20;
    this.scaleLeft = 0;
    this.scaleRight = this.state.width;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

    this.onChartZoomIn = this.onChartZoomIn.bind(this);
    this.onScaleChange = this.onScaleChange.bind(this);
  }

  componentDidMount() {
    const data = lineChartData();
    const ctx = document.getElementById(this.canvasID);
    this.chart = new Chart(ctx, {
			type: 'line',
      data: data,
      options: {
        maintainAspectRatio: false, // fit into height, width of container
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          mode: 'x'
        }
      }
		});
    this.chart.zoom.onChartZoomIn = this.onChartZoomIn;

    const sctx = document.getElementById(this.scaleCanvasID).getContext("2d");
    sctx.fillStyle = "rgba(128, 128, 128, 0.8)";
    sctx.fillRect(0, 0, this.state.width, this.scaleHeight);
  }

  drawScale(left, right) {
    const width = this.state.width;
    const height = this.scaleHeight;

    let ctx = document.getElementById(this.scaleCanvasID).getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    ctx.fillRect(0, 0, left, height);
    ctx.fillRect(right, 0, width-right, height);
    ctx.fillStyle = "rgba(128, 128, 128, 0.8)";
    ctx.fillRect(left, 0, right-left, height);

    this.scaleLeft = left;
    this.scaleRight = right;
  }

  onScaleChange(evt) {
    let left = this.scaleLeft;
    let right = this.scaleRight;
    let ldiff = Math.abs(left - evt.clientX);
    let rdiff = Math.abs(right - evt.clientX);
    if (ldiff < rdiff) {
      left = evt.clientX;
    } else {
      right = evt.clientX;
    }

    this.drawScale(left, right);

    const xaxis = this.chart.scales['x-axis-0'];
    const labels = this.chart.config.data.labels;
    const nticks = labels.length;
    const width = this.state.width;
    const startLabel = labels[Math.floor(left/width * nticks)];
    const endLabel = labels[Math.ceil(right/width * nticks)];
    this.chart.zoom.zoomInto(startLabel, endLabel);
  }

  onChartZoomIn(startLabel, endLabel) {
    const labels = this.chart.config.data.labels;
    const nticks = labels.length;
    const width = this.state.width;

    const start = labels.findIndex((label) => { return label === startLabel});
    const end = labels.findIndex((label) => { return label === endLabel});
    const left = (width/nticks)*start;
    const right = (width/nticks)*end;
    this.drawScale(left, right);
  }

  onMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(evt) {
    const rect = document.getElementById(this.canvasID).getBoundingClientRect();
    const width =  evt.screenX - (window.scrollX + rect.left);
    const height = evt.screenY - (window.screenY + rect.top);

    this.setState({
      width: width,
      height: height
    });
  }

  render() {
    const height = this.state.height;
    const width = this.state.width;
    const pstyle = {
      border:   '1px solid red',
      position: 'relative',
      padding:  '10px',
      height:   height,
      width:    width,
    };

    // redraw chart
    setTimeout(() => {
      this.chart && this.chart.resize();
    }, 10);

    return (
        <div id={this.containerID} style={pstyle}>
          <canvas id={this.canvasID} width={width} height={height}> </canvas>

          <canvas id={this.scaleCanvasID} width={width} height={this.scaleHeight} onClick={this.onScaleChange}> </canvas>

          <img src={resize} style={{cursor: 'pointer', height: '15px', width: '15px', position: 'absolute', bottom: '0px', right: '0px'}}
              onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove} />
        </div>
    );
  }
}

export default InteractiveChart;
