import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../features/settings/settingsSlice";

export const ToggleSettings = () => {
  const unit = useSelector((state) => state.settings.unit);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleUnit())}>
     {unit}
    </button>
  );
};
