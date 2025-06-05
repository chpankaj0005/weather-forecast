const apiKey = '35771844f740425f02f4868e7e6386f8';

document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    getCoordinates(city);
  } else {
    alert('Please enter a city name.');
  }
});

function getCoordinates(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},IN&limit=1&appid=${apiKey}`;
  fetch(geoUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Geocoding API request failed.');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        alert('City not found. Please check the spelling and try again.');
        return;
      }
      const { lat, lon, name } = data[0];
      getWeather(lat, lon, name);
    })
    .catch(error => {
      console.error('Error fetching coordinates:', error);
      alert('An error occurred while fetching the coordinates.');
    });
}

function getWeather(lat, lon, cityName) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather API request failed.');
      }
      return response.json();
    })
    .then(data => {
      const weatherDisplay = document.getElementById('weatherDisplay');
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const rainVolume = data.rain && data.rain['1h'] ? data.rain['1h'] : 0;

      weatherDisplay.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Rain Volume (last 1h): ${rainVolume} mm</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('An error occurred while fetching the weather data.');
    });
}
