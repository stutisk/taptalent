import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: localStorage.getItem("Celsius") || "Fahrenheit",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === "Fahrenheit" ? "Celsius" : "Fahrenheit";
      localStorage.setItem("unit", state.unit);
    },
  },
});

export const { toggleUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
