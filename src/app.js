const URL = './resources/data.json';
const bodyEl = document.getElementById('body');

let chart = generateChart();
let chartData = {};

init();

function init() {
  pullData(URL, renderChart);
  watchRangeChanges();
} 

/* Get data */
function pullData(url, cb) {
  fetch(url)
    .then(response => response.json())
    .then(res => chartData = res.data)
    .then(() => cb(chartData));
}

/* (re)Render chart based on selected range */                       
function renderChart(input, range = 'all') {
  chart.load({columns: [['chart'].concat(input[range])]});
}

/* Watch for changes in range (button clicks atm) */ 
function watchRangeChanges() {
  forAllButtons(btn => btn.addEventListener('click', e => handleChartButtonClick(e)))
}

/*  Handle changes in graph range */
function handleChartButtonClick(e) {
  toggleSelectedClass(e);
  renderChart(chartData, e.target.getAttribute('data-button'));
}

/* Initial generation of the chart  */ 
function generateChart () {
  return c3.generate({
    bindto: '#chart',
    data: {
      columns: [['chart', null]],
      types: { chart: 'spline' },
      area: { zerobased: false },     
      colors: { chart: 'white' },
    },
    legend: { hide: true },
    axis: { x: { show: false}, y: { show: false} },
    point: { show: false },
    label: { show: false },
    padding: { left: -10, right: -10 },
  });

}

/* Helper functions */
function forAllButtons(f) {
  document.querySelectorAll('.chartbutton').forEach(btn => f(btn));
}

function toggleSelectedClass(e) {
  forAllButtons(btn => btn.classList.remove('selected'))
  e.target.classList.add('selected');
  
  // adding class for color example
  bodyEl.setAttribute("class", "");
  bodyEl.classList.add(e.target.getAttribute('data-button'))
}
