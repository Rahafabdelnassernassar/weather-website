let form = document.getElementById("form1");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherFun();
  form.reset();
});
const locationF = document.getElementById("location");
const forecastF = document.getElementById("forecast");
const latitudeF = document.getElementById("latitude");
const longitudeF = document.getElementById("longitude");
const errorF = document.getElementById("error");

// const infoBox = document.getElementById("info-box");

let weatherFun = async () => {
  try {
    const address = document.getElementById("address").value;
    const res = await fetch("http://localhost:3000/weather?address=" + address);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorF.innerText = data.error;
      locationF.innerText = "";
      forecastF.innerText = "";
      latitudeF.innerText = "";
      longitudeF.innerText = "";
      // infoBox.style.display = "none"; // Hide the box if there's an error
    } else {
      // locationF.innerText = data.location;
      // forecastF.innerText = data.forecast;
      // latitudeF.innerText = data.latitude;
      // longitudeF.innerText = data.longitude;

      // infoBox.style.display = "flex"; // Show the box if data is available

      errorF.innerText = "";
      setTimeout(() => {
        locationF.innerText = data.location;
      }, 1000);

      setTimeout(() => {
        forecastF.innerText = data.forecast;
      }, 4000);

      setTimeout(() => {
        latitudeF.innerText = data.latitude;
      }, 2000);

      setTimeout(() => {
        longitudeF.innerText = data.longitude;
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
};



