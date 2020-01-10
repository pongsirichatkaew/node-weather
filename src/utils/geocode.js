const request = require('request');
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia25jMzA4M2tuYyIsImEiOiJjazU1ZWUwZ3AwOW9qM2xxaWFheGE5c2l0In0.04J42MpizhMD_f8TEHtjIw&limit=1`;
  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!!');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      const lat = body.features[0].center[1];
      const lng = body.features[0].center[0];
      const location = body.features[0].place_name;
      const data = { lat: lat, lng: lng, location: location };
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
