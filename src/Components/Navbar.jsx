import { ToggleSettings } from "../Components/ToggleSettings";
import { CitySearch } from "./CitySearch";

export const Navbar = ({ onCitySelect, query, setQuery }) => {
  const handleSelect =
    onCitySelect || ((city) => console.log("Selected city:", city));

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <section className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="text-xl font-semibold text-sky-600">SkyCasting</div>
        <div className="flex-1 hidden sm:flex justify-center">
          <CitySearch
            query={query}
            setQuery={setQuery}
            onSelect={onCitySelect}
          />
        </div>

        <div className="flex items-center gap-3">
          <ToggleSettings />
        </div>
      </section>

      <div className="sm:hidden px-4 pb-3">
        <CitySearch onSelect={handleSelect} />
      </div>
    </header>
  );
};
