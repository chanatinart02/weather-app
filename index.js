const apiKey = "cfb0ae4144026e92515a26e50d22071d";

const weatherDataEl = document.getElementById("weather-data");

const cityInput = document.getElementById("city-input");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

// fetch api
async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    //get data from api
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feel like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    // dynamic weather data
    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"/>`;

    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;
    
    weatherDataEl.querySelector(".details").innerHTML = details.map((detail) =>`<div>${detail}</div>`).join("") //iterate through details array


  } catch (err) {
    console.error('An error occurred:', err);
  // Display an error message to the user, e.g., on the UI
  weatherDataEl.innerHTML = '<div class="error">Error fetching weather data. Please try again later.</div>';
  }
}
