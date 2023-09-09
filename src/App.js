import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function weatherfoo() {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`);
      
      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('City not found or API error');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      weatherfoo();
    }
  }

  return (
    <div className="bodyofweatherappliction">
      <div className='inputdiv'>
        <input
          placeholder='Search a city here'
          className='inputofweather'
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <button className='searchbtn' onClick={weatherfoo}>Search</button>
      </div>
      <div className='displayweatherdiv'>
        {error && (
          <div className='error-message'>
            {error}
          </div>
        )}
        {weatherData && !error && (
          <div className='todayweather'>
            <h3 className='messageofweather'>{weatherData.weather[0].description}</h3>
            <h5 className='cityname'>{weatherData.name}</h5>
            <h1 className='temperature'>{weatherData.main.temp} °C</h1>
          </div>
        )}
        {weatherData && !error && (
          <ul className='weekdiv'>
            <li>
              <span>Country Name: {weatherData.sys.country}</span>
              <span>Fells Like: {weatherData.main.feels_like} °C</span>
              <span>Temperature Minimum: {weatherData.main.temp_min} °C</span>
              <span>Temperature Maximum: {weatherData.main.temp_max} °C</span>
              <span>About Weather: {weatherData.weather[0].description}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
