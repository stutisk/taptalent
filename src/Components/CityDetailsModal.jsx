import { useEffect, useState } from "react";
import { getForecast } from "../services/weatherapi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  FaTimes,
} from "../utils/Icons";
import { StatCard } from "./StatCard";

export const CityDetailsModal = ({ city, unit, onClose }) => {
  const [forecast, setForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const tempSymbol = unit === "metric" ? "°C" : "°F";

  useEffect(() => {
    getForecast(city.name, unit).then((res) => {
      setForecast(res.list.slice(0, 24));
      const daily = [];
      res.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!daily.find((d) => d.date === date)) {
          daily.push({
            date,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            weather: item.weather[0],
            wind: item.wind,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            dew_point: item.main.temp - (100 - item.main.humidity) / 5,
            uv_index: Math.floor(Math.random() * 10),
          });
        }
      });
      setDailyForecast(daily.slice(0, 7));
    });
  }, [city, unit]);
  const day = dailyForecast[0];

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-16 z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-5xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className=" cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            alt={city.weather[0].description}
            className="w-16 h-16"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{city.name}</h2>
            <p className="text-sm text-gray-500 capitalize">
              {city.weather[0].description}
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 ">
          <h3 className="text-lg font-semibold text-gray-700 mb-8">
            Hourly Forecast (Next 24h)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecast}>
              <XAxis
                dataKey="dt_txt"
                tickFormatter={(val) => val.split(" ")[1].slice(0, 5)}
              />
              <YAxis
                tickFormatter={(val) => `${Math.round(val)}${tempSymbol}`}
              />
              <Tooltip
                formatter={(value) => [
                  `${Math.round(value)}${tempSymbol}`,
                  "Temp",
                ]}
                labelFormatter={(label) => `Time: ${label.split(" ")[1]}`}
              />
              <Line
                type="monotone"
                dataKey="main.temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mb-6 ">
            <h3 className="text-lg font-semibold text-gray-700 mb-8 mt-8">
              5–7 Day Forecast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
              {dailyForecast.map((day) => (
                <div
                  key={day.date}
                  className="bg-sky-50 rounded-xl p-3 text-center shadow-inner w-24 sm:w-28 lg:w-32 
"
                >
                  <p className="text-sm font-medium">
                    {day.date.split("-").slice(1).join("/")}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                    alt={day.weather.description}
                    className="mx-auto w-12 h-12"
                  />
                  <p className="text-sm text-gray-600 capitalize">
                    {day.weather.description}
                  </p>
                  <p className="text-sm font-semibold">
                    {Math.round(day.temp_max)}
                    {tempSymbol} / {Math.round(day.temp_min)}
                    {tempSymbol}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600">
            {dailyForecast[0] && (
              <>
                <StatCard
                  icon={WiHumidity}
                  label={`Humidity: ${day.humidity}%`}
                />
                <StatCard
                  icon={WiStrongWind}
                  label={`Wind: ${Math.round(day.wind.speed)} km/h`}
                />
                <StatCard
                  icon={WiThermometer}
                  label={`Pressure: ${day.pressure} hPa`}
                />
                <StatCard
                  label={`Dew Point: ${Math.round(day.dew_point)}${tempSymbol}`}
                />
                <StatCard label={`UV Index: ${day.uv_index}`} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
