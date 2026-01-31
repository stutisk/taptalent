import { useState, useEffect } from "react";
import { searchCities } from "../services/weatherapi";
import { FaSearch } from "../utils/Icons";
export const CitySearch = ({ query, setQuery, onSelect }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      const data = await searchCities(query);
      setResults(data);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch className="text-sky-600 text-lg" />
        </span>
      </div>

      {(results.length > 0 || loading) && (
        <ul className="absolute mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto z-20">
          {loading && (
            <li className="px-4 py-3 text-sm text-gray-500">Searching...</li>
          )}
          {!loading &&
            results.map((city) => (
              <li
                key={`${city.lat}-${city.lon}`}
                className="px-4 py-3 text-sm cursor-pointer hover:bg-sky-50 transition-colors"
                onClick={() => {
                  onSelect(city);
                  setQuery(city.name); 
                  setResults([]);
                }}
              >
                <div className="font-medium text-gray-800">{city.name}</div>
                <div className="text-xs text-gray-500">{city.country}</div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
