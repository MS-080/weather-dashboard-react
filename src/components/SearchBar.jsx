
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function handleClick() {
    onSearch(city);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <button onClick={handleClick}>Search</button>

      <p>You typed: {city}</p>
    </div>
  );
}

export default SearchBar;
