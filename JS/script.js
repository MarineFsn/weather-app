const apiKey = "c6d0e75309b37671d27681581c00b99f";
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
}

function displayWeather(data) {
  weatherData.innerHTML = "";

  const cityName = data.city.name;
  const forecastList = data.list;

  const cityHeading = document.createElement("h2");
  cityHeading.textContent = cityName;
  weatherData.appendChild(cityHeading);

  let currentDate = null;
  forecastList.forEach((forecast) => {
    const date = new Date(forecast.dt_txt);
    const forecastDate = date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  });
}
