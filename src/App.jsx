import React, { useState } from "react";
import "./styles.css";

import background from "./images/background.png";
import sunny from "./images/sunny.png";
import cloudy from "./images/cloudy.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const safeNumber = (v, fallback = null) =>
    typeof v === "number" && !Number.isNaN(v) ? v : fallback;

  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = city && city.trim();
    if (!query) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}`
      );
      if (!geoRes.ok)
        throw new Error(`Failed to fetch location (status ${geoRes.status})`);
      const geoData = await geoRes.json();
      if (!geoData?.results?.length) {
        throw new Error("City not found");
      }
      const best = geoData.results[0];
      const { latitude, longitude, name, country } = best;
      if (!isFinite(latitude) || !isFinite(longitude)) {
        throw new Error("Invalid coordinates");
      }
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!weatherRes.ok)
        throw new Error(
          `Failed to fetch weather (status ${weatherRes.status})`
        );
      const weatherData = await weatherRes.json();
      const cw = weatherData.current_weather;
      const safeWeather = {
        name,
        country,
        temp: safeNumber(cw?.temperature),
        windspeed: safeNumber(cw?.windspeed),
        time: cw?.time || null,
        code: typeof cw?.weathercode === "number" ? cw.weathercode : null,
      };
      setWeather(safeWeather);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
  };

  const exampleCities = ["New York", "London", "Mumbai", "Tokyo", "São Paulo"];

  const iconForCode = (code) => {
    if (!Number.isFinite(code)) return "sunny";
    if (code === 0 || code === 1) return "sunny";
    if (code === 2 || code === 3) return "cloudy";
    if (code >= 51 && code <= 65) return "rain";
    if (code >= 71 && code <= 75) return "snow";
    return "sunny";
  };

  return (
    <div
      className="app-shell"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="card">
        <div className="title">Weather Now ☀️</div>

        <form onSubmit={handleSearch} className="controls">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
          />
          <button className="search-btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        <div className="examples">
          {exampleCities.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCity(c);
                setTimeout(() => handleSearch(), 0);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {error && (
          <div className="muted text-center" style={{ color: "#b91c1c" }}>
            {error}
          </div>
        )}

        {weather ? (
          <div className="weather-center">
            <h2>
              {weather.name}
              {weather.country ? `, ${weather.country}` : ""}
            </h2>
            <div className={`weather-icon ${iconForCode(weather.code)}`} />
            <div className="temp">
              {weather.temp !== null ? `Temp : ${weather.temp}°C` : "—"}
            </div>
            <div className="desc">
              {weatherDescriptions[weather.code] ||
                `Weather code: ${weather.code}`}
            </div>
            <div className="meta">
              Windspeed:{" "}
              {weather.windspeed !== null ? `${weather.windspeed} km/h` : "—"}
            </div>
            <div className="meta">
              Last updated:{" "}
              {weather.time ? new Date(weather.time).toLocaleString() : "—"}
            </div>
            <div className="weather-icon">
              <img
                src={
                  iconForCode(weather.code) === "sunny"
                    ? sunny
                    : iconForCode(weather.code) === "cloudy"
                    ? cloudy
                    : iconForCode(weather.code) === "rain"
                    ? rain
                    : snow
                }
                alt={iconForCode(weather.code)}
                width="100"
              />
            </div>
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center muted">
              Search for a city or use an example to see weather
            </div>
          )
        )}

        <footer className="text-center muted" style={{ marginTop: 12 }}>
          Data from{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo API
          </a>
        </footer>
      </div>
    </div>
  );
}
