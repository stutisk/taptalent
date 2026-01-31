import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather } from "../../services/weatherapi";
import { CITIES } from "../../utils/cities";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (_, { getState }) => {
    const state = getState();
    const unit = state.settings.unit;
    const favoriteCities = state.favorites.cities;

    const allCitiesData = await Promise.all(
      CITIES.map((city) => getCurrentWeather(city, unit))
    );

    const favoriteData =
      favoriteCities.length > 0
        ? await Promise.all(
            favoriteCities.map((city) => getCurrentWeather(city.name, unit))
          )
        : [];

    return { allCitiesData, favoriteData };
  }
);

const initialState = {
  allCitiesWeather: [],
  favoriteWeather: [],
  loading: true,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allCitiesWeather = action.payload.allCitiesData;
        state.favoriteWeather = action.payload.favoriteData;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather";
      });
  },
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
