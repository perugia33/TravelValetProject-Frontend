import styles from "./Weather.module.css";
import WeatherData from "./WeatherData";

const weather = [
  { day: "Sun", minTemp: 62, maxTemp: 75, condition: "Sunny  ☀️" },
  { day: "Mon", minTemp: 55, maxTemp: 85, condition: "Sunny ☀️" },
  { day: "Tue", minTemp: 56, maxTemp: 76, condition: "Cloudy 🌦️" },
  { day: "Wed", minTemp: 60, maxTemp: 77, condition: "Rainy 🌧️" },
  { day: "Thu", minTemp: 58, maxTemp: 78, condition: "Sunny ☀️" },
  { day: "Fri", minTemp: 59, maxTemp: 79, condition: "Partly Cloudy 🌤️" },
  { day: "Sat", minTemp: 60, maxTemp: 80, condition: "Sunny ☀️" },
];

function Weather() {
  return (
    <div className={styles.container}>
      <h1>Weather Forecast for -city name- </h1>
      <WeatherData weather={weather} />
    </div>
  );
}

export default Weather;
