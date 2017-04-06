import Chart from 'chart.js';

var zoomPlugin = {
	beforeInit: function(controller) {
    const zoom = controller.zoom = {};
    const canvas = controller.chart.ctx.canvas;
    const ctx = controller.chart.ctx;

    zoom.zoomInto = function(startLabel, endLabel) {
      const xaxis = controller.scales['x-axis-0'];
      xaxis.options.ticks.min = startLabel;
      xaxis.options.ticks.max = endLabel;
      controller.update(0);
    }

    canvas.addEventListener('mousedown', (evt) => {
      zoom.startEvt = evt;
    });

    canvas.addEventListener('mouseup', (evt) => {
      const xaxis = controller.scales['x-axis-0'];
      const nticks = xaxis.ticks.length;

      const start = Math.floor((zoom.startEvt.clientX-xaxis.margins.left)/(xaxis.right-xaxis.left) * nticks);
      const end = Math.ceil((evt.clientX-xaxis.margins.left)/(xaxis.right-xaxis.left) * nticks);

      xaxis.options.ticks.min = xaxis.ticks[start];
      xaxis.options.ticks.max = xaxis.ticks[end];

      if(zoom.onChartZoomIn && typeof(zoom.onChartZoomIn) === 'function') {
        zoom.onChartZoomIn(xaxis.ticks[start], xaxis.ticks[end]);
      }

      zoom.startEvt = null;
      controller.update(0);
    });

    canvas.addEventListener('mousemove', (evt) => {
      if (!zoom.startEvt) {
        return;
      }
      const x = zoom.startEvt.clientX;
      const width = evt.clientX - x;

      const yaxis = controller.scales['y-axis-0']
      const y = yaxis.top;
      const height = yaxis.bottom - y;

      controller.update(0);
      ctx.save();
      ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
      ctx.fillRect(x, y, width, height);
      ctx.restore();
    });
    
	},
  afterInit: function(controller) {
	},

  resize: function(controller, newcontrollerSize) {
	},

  beforeUpdate: function(controller) {
	},
  afterScaleUpdate: function(controller) {
	},
  beforeDatasetsUpdate: function(controller) {
	},
  afterDatasetsUpdate: function(controller) {
	},
  afterUpdate: function(controller) {
	},

  // This is called at the start of a render. It is only called once, even if the animation will run for a number of frames. Use beforeDraw or afterDraw
  // to do something on each animation frame
  beforeRender: function(controller) {
	},

  // Easing is for animation
  beforeDraw: function(controller, easing) {
	},
  afterDraw: function(controller, easing) {
	},

  // Before the datasets are drawn but after scales are drawn
  beforeDatasetsDraw: function(controller, easing) {
	},
  afterDatasetsDraw: function(controller, easing) {
	},

  destroy: function(controller) {
	}
};

Chart.pluginService.register(zoomPlugin);

export default zoomPlugin;
