import { useSelector } from "react-redux";
import { CITIES, getFavorites } from "../utils/cities";
import { useState, useEffect } from "react";
import { getCurrentWeather } from "../services/weatherapi";
import { CityCard } from "./CityCard";
import { CityDetailsModal } from "./CityDetailsModal";
import { Navbar } from "./Navbar";
import { FaSpinner } from "react-icons/fa";
import { TbPinnedFilled } from "react-icons/tb";

export const DashBoard = () => {
  const unit = useSelector((state) => state.settings.unit);
  const [allCitiesWeather, setAllCitiesWeather] = useState([]);
  const [favoriteWeather, setFavoriteWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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

  const [searchQuery, setSearchQuery] = useState("");

  const handleCitySelect = (city) => {
    const filtered = allCitiesWeather.filter(
      (c) =>
        c.id === city.id || c.name.toLowerCase() === city.name.toLowerCase()
    );
    setSearchResults(filtered.length > 0 ? filtered : []);
    setSearchQuery(city.name);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      <Navbar
        onCitySelect={handleCitySelect}
        query={searchQuery}
        setQuery={setSearchQuery}
      />

      <main className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-24 text-sky-600">
            <FaSpinner className="animate-spin text-4xl mb-4" />
            <p className="text-sm font-medium text-gray-600 tracking-wide">
              Fetching latest weather...
            </p>
          </div>
        ) : (
          <>
            {searchQuery.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-5 text-lg font-semibold text-gray-800">
                  Search Results
                </h2>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {searchResults.map((city) => (
                      <CityCard
                        key={city.id}
                        data={city}
                        unit={unit}
                        onClick={setSelectedCity}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 mt-4">
                    No cities found matching "{searchQuery}"
                  </p>
                )}
              </section>
            )}

            {favoriteWeather.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-5 flex items-center gap-2 font-semibold text-sky-700 tracking-wide">
                  <TbPinnedFilled className="text-yellow-500 text-lg drop-shadow-sm" />
                  Pinned Favorites
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favoriteWeather.map((city) => (
                    <CityCard
                      key={city.id}
                      data={city}
                      unit={unit}
                      onClick={setSelectedCity}
                    />
                  ))}
                </div>
              </section>
            )}
            {searchResults.length === 0 && (
              <section>
                <h2 className="mb-5 text-lg font-semibold text-gray-800">
                  All Cities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allCitiesWeather.map((city) => (
                    <CityCard
                      key={city.id}
                      data={city}
                      unit={unit}
                      onClick={setSelectedCity}
                    />
                  ))}
                </div>
              </section>
            )}

            {searchResults.length === 0 && allCitiesWeather.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No cities found.</p>
            )}
          </>
        )}
      </main>

      {selectedCity && (
        <CityDetailsModal
          city={selectedCity}
          unit={unit}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </>
  );
};
