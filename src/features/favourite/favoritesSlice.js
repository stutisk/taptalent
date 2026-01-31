import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const city = action.payload;
      const exists = state.cities.find((c) => c.id === city.id);

      if (exists) {
        state.cities = state.cities.filter((c) => c.id !== city.id);
      } else {
        state.cities.push(city);
      }

      localStorage.setItem("favorites", JSON.stringify(state.cities));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
