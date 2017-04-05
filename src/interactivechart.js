import React from 'react';
import Chart from 'chart.js';
import { lineChartData }  from './datasource';

import resize from './resize.png';

var counter = 0;

class InteractiveChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasID = 'canvas_id_' + counter++;
    this.containerID = 'container_id_' + counter++;

    this.chart = null; // chart being drawn
    this.state = {
      height: 420,
      width: 420
    };
    this.resizing = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentDidMount() {
    const data = lineChartData();
    const ctx = document.getElementById(this.canvasID);
    this.chart = new Chart(ctx, {
			type: 'line',
      data: data,
      options: {
        maintainAspectRatio: false, // fit into height, width of container
      }
		});
  }

  onMouseUp() {
    this.resizing = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown() {
    this.resizing = true;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(evt) {
    if ( !this.resizing) {
      return;
    }

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

          <img src={resize} style={{cursor: 'pointer', height: '15px', width: '15px', position: 'absolute', bottom: '0px', right: '0px'}}
              onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove} />
        </div>
    );
  }
}

export default InteractiveChart;
