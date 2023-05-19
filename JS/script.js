const apiKey = "c6d0e75309b37671d27681581c00b99f";
const unsplashApiKey = "Qfvtl9iqcTHztiTYaBSnG17pM77dElKnANbxSkaOp04";
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherData = document.getElementById("weatherData");
let temperatureChart = null; // Variable pour stocker le graphique

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
      getCityPhoto(city);
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

    if (forecastDate !== currentDate) {
      currentDate = forecastDate;

      const day = date.toLocaleDateString("fr-FR", { weekday: "long" });
      const temperature = forecast.main.temp;
      const description = forecast.weather[0].description;

      const weatherInfo = document.createElement("p");
      weatherInfo.textContent = `${day}, ${forecastDate}: ${temperature}°C, ${description}`;
      weatherData.appendChild(weatherInfo);
    }
  });

  const temperatureData = forecastList.map((forecast) => forecast.main.temp);

  const temperatureChartElement = document.getElementById("temperatureChart");


  if (temperatureChart !== null) {
    temperatureChart.destroy();
  }

 
  temperatureChart = new Chart(temperatureChartElement, {
    type: "line",
    data: {
      labels: forecastList.map((forecast) => forecast.dt_txt),
      datasets: [
        {
          label: "Temperature",
          data: temperatureData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function getCityPhoto(city) {
  const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;

  fetch(unsplashApiUrl)
    .then((response) => response.json())
    .then((photoData) => {
      const photoUrl = photoData.urls.regular;

      const cityPhoto = document.createElement("img");
      cityPhoto.src = photoUrl;
      cityPhoto.alt = city;
      weatherData.appendChild(cityPhoto);
    })
    .catch((error) => {
      console.log("Failed to fetch city photo:", error);
    });
}
