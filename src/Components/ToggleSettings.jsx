import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../features/settings/settingsSlice";

export const ToggleSettings = () => {
  const unit = useSelector((state) => state.settings.unit);
  const dispatch = useDispatch();

  return (
    <button
    onClick={() => dispatch(toggleUnit())}
    className="px-4 py-2 rounded bg-blue-500 text-white"
  >
    {unit === "metric" ? "°C → °F" : "°F → °C"}
  </button>
  );
};
