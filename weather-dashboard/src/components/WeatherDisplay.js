// Import React, useEffect for side effects, and useState for local state management
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API requests

// OpenWeatherMap API key (replace 'YOUR_API_KEY_HERE' with your actual key)
const API_KEY = '820bb6564d39ef6481e0c2f3f5b50ede';

// Define the WeatherDisplay component and accept props: city, units
function WeatherDisplay({ city, units }) {
  // State to store the current weather data
  const [weatherData, setWeatherData] = useState(null);

  // State to store the 5-day weather forecast data
  const [forecastData, setForecastData] = useState(null);

  // Effect hook to fetch weather data when 'city' or 'units' changes
  useEffect(() => {
    if (city) {
      // Fetch current weather data
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`)
        .then((response) => setWeatherData(response.data)) // Update weatherData state
        .catch((error) => console.error(error)); // Log errors to the console

      // Fetch 5-day forecast data
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`)
        .then((response) => setForecastData(response.data)) // Update forecastData state
        .catch((error) => console.error(error)); // Log errors to the console
    }
  }, [city, units]); // Dependencies: runs effect whenever 'city' or 'units' changes

  return (
    // Container for the weather display
    <div className="weather-display">
      {/* Display current weather if data is available */}
      {weatherData ? (
        <div>
          <h2>Current Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}° {units === 'metric' ? 'C' : 'F'}</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Enter a city to see the weather.</p> // Default message when no city is entered
      )}

      {/* Display 5-day forecast if data is available */}
      {forecastData ? (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          {/* Iterate over the first 5 items of the forecast data */}
          {forecastData.list.slice(0, 5).map((item, index) => (
            <div key={index}>
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p> {/* Convert timestamp to readable date */}
              <p>Temp: {item.main.temp}°</p>
              <p>Condition: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Export the WeatherDisplay component so it can be used in other parts of the app
export default WeatherDisplay;
