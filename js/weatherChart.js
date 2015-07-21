$(document).ready(function() {
  var API_KEY = '49dd8f14d7aa0798';
  var URL = 'http://api.wunderground.com/api/49dd8f14d7aa0798/hourly/q/NY/New_York_City.json'; 

  $.getJSON(URL).done(function(data) {
    console.log(data);
    buildChart(data.hourly_forecast);
  });

  function buildChart(forecastData) {
    var temps = [];
    var labels = [];
    var ctx = document.getElementById('NYCWeatherChart').getContext('2d');
    var lineChart;
    var label;
    var hour;
    var temp;
    var data;

    for (var i = 0; i < forecastData.length; i++) {
      hour = forecastData[i];
      temp = Number(hour.feelslike.english);
      label = hour.FCTTIME.hour;
      temps.push(temp);
      labels.push(label);
    };

    console.log(data);
    console.log(labels);

    data = {
      labels: labels,
      datasets: [
        {
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: temps    
        }
      ]
    }

    lineChart = new Chart(ctx).Line(data);
  }



});

