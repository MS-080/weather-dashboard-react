
function WeatherCard({ city, temperature, humidity, wind }) {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {temperature} °C</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind} km/h</p>
    </div>
  );
}

export default WeatherCard;
