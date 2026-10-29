
import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch(city) {
    const newCity = city.trim();

    if (!newCity) {
      setSearchedCity("");
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    setSearchedCity(newCity);
  }

  useEffect(() => {
    if (!searchedCity) return;

    const controller = new AbortController();

    async function fetchWeather() {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        // Step 1: Get city coordinates
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchedCity)}&count=1`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to find the city.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          throw new Error("City not found. Please try again.");
        }

        const location = data.results[0];

        // Step 2: Get real weather data
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
          { signal: controller.signal }
        );

        if (!weatherResponse.ok) {
          throw new Error("Failed to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        if (!weatherData.current) {
          throw new Error("Weather data is unavailable.");
        }

        // Step 3: Save weather information
        if (!controller.signal.aborted) {
          setWeather({
            city: location.name,
            temperature: weatherData.current.temperature_2m,
            humidity: weatherData.current.relative_humidity_2m,
            wind: weatherData.current.wind_speed_10m
          });
        }

      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [searchedCity]);

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <p>Check the weather in your city</p>

      <SearchBar onSearch={handleSearch} />

      <p>Selected city: {searchedCity}</p>

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <ErrorMessage message={error} />
      )}

      {!loading && !error && weather && (
        <WeatherCard
          city={weather.city}
          temperature={weather.temperature}
          humidity={weather.humidity}
          wind={weather.wind}
        />
      )}
    </div>
  );
}

export default App;
