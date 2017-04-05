// generate data for different chart types

// data for line charts
function lineChartData(npoints, nlines, max, min) {
  npoints = npoints || 30;
  nlines = nlines || 2;
  max = max || 100;
  min = min || 0;

  let labels = [];
  let datasets = [];

  // labels
  for (let i = 0; i < npoints; i++) {
    labels.push('label' + i);
  }

  // datasets
  for (let i = 0; i < nlines; i++) {
    let label = 'Line ' + i;
    let data = [];
    for (let x = 0; x < npoints; x++) {
      let y = min + Math.floor(Math.random() * (max-min));
      data.push(y);
    }
    datasets.push({
      label: label,
      data: data
    });
  }

  return {
    labels: labels,
    datasets: datasets,
  };
}


export { lineChartData };

