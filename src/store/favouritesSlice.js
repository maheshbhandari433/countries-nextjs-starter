import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
    if (
      state.favourites.some(
        (favourite) => favourite.name.common === action.payload.name.common
      )
    )
      return;
    state.favourites = [...state.favourites, action.payload];
  },
    clearFavourites(state, action) {
      state.favourites = [];
    },
  },
});

export const { addFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
