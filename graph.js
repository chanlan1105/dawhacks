const functions = [
    function(x, y) {
        return [Math.sinh(x) * Math.cosh(y), "sinh(x)*cosh(x)"];
    },
    function(x, y) {
        return [Math.pow(x, 2) + Math.pow(y, 2), "x^2+y^2"];
    },
    function(x, y) {
        return [Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), "(x^2+y^2)^0.5"];
    },
    function(x, y) {
        return [Math.exp(-x*x - y*y), "-x^2-y^2"];
    },
    function(x, y) {
        return  [Math.sqrt(1 - Math.pow(x, 2) - Math.pow(y, 2)), "(1-x^2-y^2)^0.5"];
    },
    function(x, y) {
        return [Math.pow(y, 2) - Math.pow(x, 2), "y^2-x^2"];
    },
    function(x, y) {
        return [Math.sin(x*y), "sin(xy)"];
    },
    function(x, y) {
        return [Math.sin(x) * Math.cos(y), "sin(x)*cos(y)"];
    },
    function(x, y) {
        return [(Math.pow(x, 2) - Math.pow(y, 2)) / (Math.pow(x, 2) + Math.pow(y, 2)), "(x^2-y^2)/(x^2+y^2)"];
    },
    function(x, y) {
        return [(Math.pow(y, 2) * Math.pow(Math.sin(x), 2)) / (Math.pow(x, 4) + Math.pow(y, 4)), "(y^2*sin^2(x))/(x^4+y^4)"];
    },
    function(x, y) {
        return [(Math.exp(-Math.pow(x, 2) - Math.pow(y, 2)) - 1) / (Math.pow(x, 2) + Math.pow(y, 2)), "(e^(-x^2-y^2)-1)/(x^2+y^2)"];
    },
    function(x, y) {
        return [(Math.sin(5*x)*Math.cos(5*y))/5, "(sin(5x)*cos(5y))/5"];
    },
    function(x, y) {
        return [x*y^3-y*x^3, "x*y^3-y*x^3"];
    },
    function(x, y) {
        return [Math.cos(Math.abs(x)+Math.abs(y)), "cos(abs(x)+abs(y))"];
    },
    function(x, y) {
        return [Math.asin(x*y), "arcsin(xy)"];
    },


];

const randomIndex = Math.floor(Math.random() * functions.length);

const selectedFunction = functions[randomIndex];

const n = 100; // Number of points
const step = 2 / n;
const x = [...Array(n).keys()].map(i => -1 + i * step); // Array of x values
const y = [...Array(n).keys()].map(i => -1 + i * step); // Array of y values
const z = [];
for (let i = 0; i < n; i++) {
    z.push([]);
    for (let j = 0; j < n; j++) {
        z[i].push(selectedFunction(x[i], y[j])[0]); // Use the selected function here
    }
}

var layout = {
    title: {
      text: selectedFunction(x,y)[1],
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    width: 800,
    paper_bgcolor: "rgba(0, 0, 0, 0)"
};

var customPurpleScale = [
    [0, 'rgb(230, 230, 250)'],
    [0.25, 'rgb(218, 112, 214)'],
    [0.5, 'rgb(186, 85, 211)'],
    [0.75, 'rgb(148, 0, 211)'],
    [1, 'rgb(128, 0, 128)']
];

Plotly.newPlot('plot', [{
    type: 'surface',
    x: x,
    y: y,
    z: z,
    //colorscale: 'Viridis',
    colorscale: customPurpleScale,
    reversescale: true
}], layout);

document.body.style.backgroundColor = customPurpleScale[0][1];
