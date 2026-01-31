import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice";
import favoritesReducer from "../features/favourite/favoritesSlice";
import weatherReducer from "../features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    favorites: favoritesReducer,
    weather: weatherReducer,
  },
});
