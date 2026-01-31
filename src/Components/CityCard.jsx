import { toast } from "react-toastify";
import { FaStar, FaRegStar } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favourite/favoritesSlice";

export const CityCard = ({ data, unit, onClick }) => {
  const symbol = unit === "metric" ? "°C" : "°F";
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.cities);
  const isFav = favorites.some((c) => c.id === data.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(data));
    if (isFav) {
      toast.info("Removed from favorites", { toastId: data.id });
    } else {
      toast.success("Added to favorites ", { toastId: data.id });
    }
    
  };
  

  return (
    <div
      onClick={() => onClick?.(data)}
      className="group relative cursor-pointer rounded-2xl bg-gradient-to-br from-white to-sky-50 border border-gray-200/70 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 text-xl transition-transform duration-200 hover:scale-125"
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
          <strong>{data.main.humidity}%</strong>
        </p>

        <p className="flex items-center gap-1">
          <WiStrongWind className="text-sky-500 text-lg" />
          <span>Wind:</span>
          <strong>{Math.round(data.wind.speed)} km/h</strong>
        </p>
      </div>
    </div>
  );
};
