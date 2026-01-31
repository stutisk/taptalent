import { useEffect, useState } from "react";
import { getFavorites, saveFavorites } from "../utils/cities";
import { FaStar, FaRegStar } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

export const CityCard = ({ data, unit, onClick }) => {
  const symbol = unit === "metric" ? "°C" : "°F";
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    setIsFav(favs.some((c) => c.id === data.id));
  }, [data.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    let favs = getFavorites();
    if (isFav) {
      favs = favs.filter((c) => c.id !== data.id);
    } else {
      favs.push(data);
    }
    saveFavorites(favs);
    setIsFav(!isFav);
  };

  return (
    <div
      onClick={() => onClick?.(data)}
      className="
        group
        relative
        cursor-pointer
        rounded-2xl
        bg-gradient-to-br from-white to-sky-50
        border border-gray-200/70
        p-5
        shadow-md
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      <button
        onClick={toggleFavorite}
        className="
          absolute top-3 right-3
          text-xl
          transition-transform duration-200
          hover:scale-125
        "
        title={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? (
          <FaStar className="text-yellow-400 drop-shadow-md" />
        ) : (
          <FaRegStar className="text-gray-400 hover:text-yellow-400" />
        )}
      </button>

      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {data.name}
      </h3>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-4xl font-extrabold text-sky-600 leading-none">
            {Math.round(data.main.temp)}
            <span className="ml-1 text-xl font-medium align-top">{symbol}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {data.weather[0].description}
          </p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="h-20 w-20 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mt-4">
        <p className="flex items-center gap-1">
          <WiHumidity className="text-sky-500 text-lg" />
          <span>Humidity:</span>
          <strong className="text-gray-700">{data.main.humidity}%</strong>
        </p>

        <p className="flex items-center gap-1">
          <WiStrongWind className="text-sky-500 text-lg" />
          <span>Wind:</span>
          <strong className="text-gray-700">
            {Math.round(data.wind.speed)} km/h
          </strong>
        </p>
      </div>
    </div>
  );
};
