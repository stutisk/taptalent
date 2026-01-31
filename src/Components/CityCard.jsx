import { useEffect, useState } from "react";
import { getFavorites, saveFavorites } from "../utils/cities";

export const CityCard = ({ data, unit, onClick }) => {
  const symbol = unit === "metric" ? "°C" : "°F";

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    setIsFav(favs.some((c) => c.id === data.id));
  }, [data.id]);

  const toggleFavorite = () => {
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
      onClick={() => onClick && onClick(data)}
      className=" cursor-pointer bg-white rounded-xl shadow-md p-5 w-64 hover:shadow-lg transition"
    >
      <div className="flex justify-between">
        <h3>{data.name}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            toggleFavorite();
          }}
        >
          {isFav ? "⭐" : "☆"}
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(data.main.temp)}
            {symbol}
            {/* {tempUnit} */}
          </p>
          <p className="text-sm text-gray-500 capitalize">
            {data.weather[0].description}
          </p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="w-16 h-16"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
        <p> 5%</p>
        <p> 6 </p>
      </div>
    </div>
  );
};
