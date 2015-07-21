$(document).ready(function() {
  var API_KEY = '49dd8f14d7aa0798';
  var url = 'http://api.wunderground.com/api/49dd8f14d7aa0798/hourly/q/NY/New_York_City.json'; 

  makeAjaxRequest(url, buildChart);

});

function makeAjaxRequest(url, callback) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: callback
  });
}

function buildChart(data) {
  var temps = getFarenheits(data);
  var hours = getHours(data);
  var data = generateDataSet(hours, data);
  var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
  var lineChart = new Chart(ctx).Line(data);
}

function getFarenheits(data) {
  data = data.hourly_forecast;
  var temps = [];
  var hour;
  var temp;

  for (var i = 0; i < data.length; i++) {
    hour = data[i];
    temp = hour.feelslike.english;
    temps.push(temp);
  };

  return temps;
}

function getHours(data) {
  data = data.hourly_forecast;
  var hours = [];
  var hour;

  for (var i = 0; i < data.length; i++) {
    hour = data[i].FCTTIME.hour;
    hours.push(hour);
  };

  return hours;
}

function generateDataSet(labels, data) {

  var dataset = {
    labels: labels,
    datasets: [
      {
        label: "Hourly Weather for New York",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: data    
      }
    ]
  }
  console.log(dataset);
  return dataset;

}

