const { response } = require('express');
const express = require('express');


const https = require('https');
const app = express();


app.get("/", (req, res) => {
    const apiKey = "Сюда включаем API key предоставленный by weather API !!!";       // добавить и спрятать ключ.
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=55.7879&lon=49.1233&appid=' + apiKey + '&units=metric';

    https.get(url, response => {

        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const URLICON = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currnetly " + desc + "</p>");
            res.write("<h1>The temperature in Kazan is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + URLICON + ">");
            res.send();
        })
    })
});


app.listen(3000, () => {
    console.log('server is running...')
})