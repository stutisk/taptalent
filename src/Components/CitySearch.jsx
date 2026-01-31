import { useState, useEffect } from "react";
import { searchCities } from "../services/weatherapi";

export const CitySearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length < 2) return;

      const data = await searchCities(query);
      setResults(data);
    }, 400); 

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative">
      <input
        className="border p-2 w-full"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="absolute bg-white border w-full z-10">
          {results.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(city);
                setQuery("");
                setResults([]);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
