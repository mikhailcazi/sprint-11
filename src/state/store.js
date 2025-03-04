import { configureStore } from "@reduxjs/toolkit";
import { pokedexApi } from "./pokedexApi";
import { pokeCartApi } from "./pokeCartApi";

export const store = configureStore({
  reducer: {
    [pokedexApi.reducerPath]: pokedexApi.reducer,
    [pokeCartApi.reducerPath]: pokeCartApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(pokedexApi.middleware).concat(pokeCartApi.middleware),
});
