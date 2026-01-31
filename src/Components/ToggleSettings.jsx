import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../features/settings/settingsSlice";
import { FiSettings } from "react-icons/fi";

export const ToggleSettings = () => {
  const unit = useSelector((state) => state.settings.unit);
  const dispatch = useDispatch();

  const isMetric = unit === "metric";

  return (
    <div
      className="
        flex items-center gap-3
        rounded-xl
        bg-white/80 backdrop-blur
        px-4 py-2
        border border-gray-200
        shadow-sm
      "
    >
      <div className="hidden sm:flex items-center gap-2">
        <FiSettings className="text-sky-600 text-lg" />
        <span className="text-sm font-semibold text-gray-700">Settings</span>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <span
          className={`select-none text-xs font-medium ${
            isMetric ? "text-sky-600" : "text-gray-500"
          }`}
        >
          °C
        </span>

        <input
          type="checkbox"
          checked={!isMetric}
          onChange={() => dispatch(toggleUnit())}
          className="sr-only peer"
          role="switch"
          aria-checked={!isMetric}
        />

        <div
          className="
            relative mx-2 h-5 w-9
            rounded-full
            bg-gray-300
            peer-focus:outline-none
            peer-focus:ring-2 peer-focus:ring-sky-300
            after:content-['']
            after:absolute after:top-[2px] after:left-[2px]
            after:h-4 after:w-4
            after:rounded-full after:bg-white
            after:transition-all
            peer-checked:bg-sky-500
            peer-checked:after:translate-x-full
          "
        />

        <span
          className={`select-none text-xs font-medium ${
            !isMetric ? "text-sky-600" : "text-gray-500"
          }`}
        >
          °F
        </span>
      </label>
    </div>
  );
};
