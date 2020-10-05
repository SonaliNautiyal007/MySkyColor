const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const port = process.env.PORT || 3000

const apiKey = 'e2dd8cc9259d8d83daec49108207d413';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It is ${weather.main.temp} degree Celcius in ${weather.name}!.    The pressure is ${weather.main.pressure}.
		     Humidity is ${weather.main.humidity}.     Wind Speed is ${weather.wind.speed}.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

// app.listen(3000, function () {
//   console.log('Weather app listening on port 3000!')
// })

app.listen(port,function(){
  console.log("Server is runnning!!");
})