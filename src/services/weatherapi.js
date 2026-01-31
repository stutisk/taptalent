const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city, unit = "metric") => {
  console.log("weatherApi loaded");
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );

    console.log("Fetching:", city, unit);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "API error");
    }

    return await res.json();
  } catch (err) {
    console.error("Weather fetch failed:", err.message);
    throw err;
  }
};

export const searchCities = async (query) => {
    if (!query) return [];
  
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
  
    return res.json(); 
  };

  export const getForecast = async (city, unit) => {
    const res = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("forecast failed");
    return res.json();
  };
  