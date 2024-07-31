const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=51a20bc2793045b6b26142621220803&q=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather api", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, {
        location: "Country is " + response.body.location.name,
        forecast:
          " It is " +
          response.body.current.condition.text +
          " and temp is " +
          response.body.current.temp_c,
        latitude: "latitude is " + latitude,
        longitude: "longitude is " + longitude,
      });
    }
  });
};
module.exports = forecast;
