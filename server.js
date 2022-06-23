require('dotenv').config();
const express = require("express");
const app = express();
const https = require("https");
const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const query = "Kyoto";
  const key = process.env.KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric" +
    "&appid=" +
    key;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      var temperature = weatherData.main.temp + "°";
      var humidity = weatherData.main.humidity;
      var wind = weatherData.wind.speed;
      var cloudy = weatherData.clouds.all;
      var description = weatherData.weather[0].description;
      var city = weatherData.name;
      var icon = weatherData.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("index", {
        temp: temperature,
        humidity: humidity,
        wind: wind,
        cloudy: cloudy,
        description: description,
        city: city,
        imageUrl: imageUrl,
      });
    });
  });
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const key = "ab6c61974800938560b5ce4e3e472ef1";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric" +
    "&appid=" +
    key;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      var temperature = weatherData.main.temp + "°";
      var humidity = weatherData.main.humidity;
      var wind = weatherData.wind.speed;
      var cloudy = weatherData.clouds.all;
      var description = weatherData.weather[0].description;
      var city = weatherData.name;
      var icon = weatherData.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("index", {
        temp: temperature,
        humidity: humidity,
        wind: wind,
        cloudy: cloudy,
        description: description,
        city: city,
        imageUrl: imageUrl,
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
