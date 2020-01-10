const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/b8b8d049a37f1553e2791e7febc6b77c/${lat},${lng}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`'Unable to connect to weather service!'`);
    } else if (body.error) {
      callback(`Unable to find location`);
    } else {
      const format = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.\nThere is a ${body.currently.precipProbability}% chance of rain with highest ${body.daily.data[0].temperatureMax} degree of the day`;
      callback(undefined, format);
    }
  });
};

module.exports = forecast;
