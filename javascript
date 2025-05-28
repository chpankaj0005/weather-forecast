const apiKey = '35771844f740425f02f4868e7e6386f8'; 

function getWeather() {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found');
        return;
      }
      displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
