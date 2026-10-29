# Weather Dashboard — React Multi-Component Application

## Project Overview

This project is a responsive Weather Dashboard developed using React and Vite for Assignment 5.

The application allows users to search for a city and view real-time weather information, including temperature, humidity, and wind speed.

Weather data is retrieved from the Open-Meteo API using JavaScript `fetch()` and React Hooks.

## Features

- Search for weather information by city name.
- Display current temperature in degrees Celsius.
- Display relative humidity as a percentage.
- Display wind speed in km/h.
- Fetch real weather data using the Open-Meteo API.
- Show a loading message while fetching data.
- Display an error message when a city is not found or an API request fails.
- Responsive interface for desktop, tablet, and mobile devices.

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- JSX
- HTML5
- CSS3
- Open-Meteo API

## Project Structure

```text
weather-dashboard-react/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## React Components

### App.jsx

The main component of the application.

Responsibilities:
- Manages the searched city.
- Manages weather data, loading, and error states using `useState`.
- Uses `useEffect` to fetch weather data when the selected city changes.
- Passes data and callback functions to child components through props.
- Conditionally renders loading, error, and success states.

### SearchBar.jsx

Allows users to enter a city name and submit a weather search.

Uses `useState` to manage the input value and receives the `onSearch` callback through props.

### WeatherCard.jsx

Displays the weather information received through props:
- City name
- Temperature
- Humidity
- Wind speed

### LoadingSpinner.jsx

Displays a loading message while weather data is being fetched.

### ErrorMessage.jsx

Displays an error message received through the `message` prop.

## React Hooks

### useState

The application uses `useState` to manage:

- `searchedCity`: the selected city.
- `weather`: the retrieved weather information.
- `loading`: whether data is being fetched.
- `error`: the current error message.

The SearchBar component also uses `useState` to manage the text entered by the user.

### useEffect

The application uses `useEffect` to fetch weather information when `searchedCity` changes.

The dependency array is:

```jsx
[searchedCity]
```

An `AbortController` is used to cancel obsolete requests during effect cleanup.

## Props and Component Communication

The application follows React's parent-to-child data flow.

- App passes `onSearch` to SearchBar.
- SearchBar calls `onSearch` when the Search button is clicked.
- App passes the retrieved weather data to WeatherCard.
- App passes error messages to ErrorMessage.

State is managed close to where it is needed, avoiding unnecessary prop drilling.

## Weather API

This project uses the Open-Meteo API.

Two API requests are performed:

1. Geocoding API: converts the city name into latitude and longitude.
2. Forecast API: retrieves current temperature, relative humidity, and wind speed.

API documentation:

https://open-meteo.com/en/docs

https://open-meteo.com/en/docs/geocoding-api

No API key is required for this educational project.

## Installation and Setup

### Prerequisites

- Node.js
- npm

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-dashboard-react.git
```

### Step 2: Navigate to the Project Folder

```bash
cd weather-dashboard-react
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open the Application

Open the local URL displayed in the terminal, usually:

http://localhost:5173/

## How to Use

1. Open the Weather Dashboard in a browser.
2. Enter a city name, such as Beirut, Paris, or Strasbourg.
3. Click the Search button.
4. Wait for the weather data to load.
5. View the city's temperature, humidity, and wind speed.
6. If the city cannot be found, an error message is displayed.

## Responsive Design

The dashboard uses CSS media queries and flexible layouts to adapt to different screen sizes.

The interface is designed for desktop, tablet, and mobile screens.

## Error Handling

The application handles:
- Empty city searches.
- Unknown city names.
- Unsuccessful API responses.
- Network or data retrieval errors.

Loading, error, and successful weather results are rendered conditionally.

## Author

Computer and Communication Engineering Student

## Assignment

Assignment 5 — React Multi-Component Application