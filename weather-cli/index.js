const axios = require('axios');

// Read city name from command line arguments
const city = process.argv[2];

if (!city) {
  console.error("Usage: node index.js <city>");
  process.exit(1);
}

// Insert your OpenWeatherMap API key here (or set OPENWEATHERMAP_API_KEY env var)
const API_KEY = '0e9ad0e0dd4d5747ca9bd8c883bce3c2';

// Construct the API URL (metric units for Celsius)
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

async function fetchWeather() {
  try {
    const response = await axios.get(URL);
    const temp = response.data.main.temp;
    const description = response.data.weather[0].description;
    console.log(`Weather in ${city}: ${temp}°C, ${description}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`City "${city}" not found. Please check the city name.`);
    } else {
      console.error("Failed to fetch weather data. Please check your internet connection or try again later.");
      if (error.response && error.response.data && error.response.data.message) {
        console.error('API message:', error.response.data.message);
      } else {
        console.error(error.message);
      }
    }
    process.exit(1);
  }
}

fetchWeather();
//test
//test2