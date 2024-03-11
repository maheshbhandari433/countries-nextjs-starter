import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteToFirebase,
  auth,
  clearFavouritesFromFirebase,
  removeFavouriteFromFirebase,
} from "../auth/firebase";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    addFavourite(state, action) {
      if (state.favourites.some((fav) => fav === action.payload))
        state.favourites = [...state.favourites];
      state.favourites = [...state.favourites, action.payload];

      const user = auth.currentUser;
      if (user) addFavouriteToFirebase(user.uid, action.payload);
    },
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      state.favourites = [...newArray];

      const user = auth.currentUser;
      if (user) {
        removeFavouriteFromFirebase(user.uid, action.payload);
      }
    },
    clearFavourites(state) {
      state.favourites = [];
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromFirebase(user.uid);
      }
    },
  },
});

export const { getFavourites, addFavourite, clearFavourites, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;