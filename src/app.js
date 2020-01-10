const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPaths);

// Create static directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Pongsiri Chatkaew'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Pongsiri Chatkaew'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text',
    name: 'Pongsiri Chatkaew'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'you must provide a address term' });
  }
  geocode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, lng, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        location: location,
        forecast: forcastData,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'yout must provide a search term' });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found',
    name: 'Pongsiri Chatkaew'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    name: 'Pongsiri Chatkaew'
  });
});
//app.com
//app.com/help

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
