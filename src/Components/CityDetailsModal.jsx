import { useEffect, useState } from "react";
import { getForecast } from "../services/weatherapi";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export const CityDetailsModal = ({ city, unit, onClose }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getForecast(city.name, unit).then((res) => {
      setForecast(res.list.slice(0, 8)); 
    });
  }, [city, unit]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-3xl">
        <button onClick={onClose} className="float-right">Close</button>

        <h2 className="text-xl font-bold mb-4">
          {city.name} Hourly Forecast
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecast}>
            <XAxis dataKey="dt_txt" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="main.temp"
              stroke="#2563eb"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
