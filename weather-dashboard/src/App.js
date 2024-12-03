import React, { useState } from "react";
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites'
import './App.css';
function App() {
  const [city, setCity] = useState('');
  const [units, setUnits] = useState('metric');
  return (
    <div className="App">
      <h1>Weather Dahboards</h1>
      <Search setCity = {setCity} units={units} setUnits={setUnits} />
      <WeatherDisplay city = {city} units={units} />
      <Favorites setCity={setCity}/>
    </div>
  );
}
export default App;