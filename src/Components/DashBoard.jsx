import { useSelector } from "react-redux";
import { CITIES, getFavorites } from "../utils/cities";
import { CitySearch } from "./CitySearch";
import { useState, useEffect } from "react";
import { getCurrentWeather } from "../services/weatherapi";
import { ToggleSettings } from "../Components/ToggleSettings";
import { CityCard } from "./CityCard";
import { CityDetailsModal } from "./CityDetailsModal";

export const DashBoard = () => {
  const unit = useSelector((state) => state.settings.unit);
  const [allCitiesWeather, setAllCitiesWeather] = useState([]);
  const [favoriteWeather, setFavoriteWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const favorites = getFavorites();
        const allCitiesData = await Promise.all(
          CITIES.map((city) => getCurrentWeather(city, unit))
        );
        const favoriteData = await Promise.all(
          favorites.map((city) => getCurrentWeather(city.name, unit))
        );
        setAllCitiesWeather(allCitiesData);
        setFavoriteWeather(favoriteData);
      } catch (err) {
        console.error("Weather fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 60 * 1000);
    return () => clearInterval(interval);
  }, [unit]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ToggleSettings />

      <CitySearch />

      {favoriteWeather.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6"> Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {favoriteWeather.map((city) => (
              <CityCard
                key={city.id}
                data={city}
                unit={unit}
                onClick={setSelectedCity}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="text-xl font-semibold mt-8"> All Cities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {allCitiesWeather.map((city) => (
          <CityCard
            key={city.id}
            data={city}
            unit={unit}
            onClick={setSelectedCity}
          />
        ))}
      </div>
      {selectedCity && (
        <CityDetailsModal
          city={selectedCity}
          unit={unit}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </div>
  );
};
