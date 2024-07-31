const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const path = require("path");
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

//////////////////////////////////////////////////////////////////////////////////

app.set("view engine", "hbs");

const viewsDirectory = path.join(__dirname, "../temp1/views");
app.set("views", viewsDirectory);

app.get("/", (req, res) => {
  res.render("index", {
    title:
      "Welcome to our website. To know your country's weather info, please enter the name of your country.",
   // img6: "images/1.PNG",
  });
});


const geocode = require("./data/geocode");
const forecast = require("./data/forecastFile");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a country name",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData.forecast,
        location: "Country is " + req.query.address,
        latitude: forecastData.latitude,
        longitude: forecastData.longitude,
      });
    });
  });
});

/////////////////////////////////////////////////////////////////////////////

app.get("*", (req, res) => {
  res.send("404 Page Not Founded");
});

///////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
