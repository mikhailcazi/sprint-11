import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokedexApi = createApi({
  reducerPath: "pokedexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: () => "pokemon?limit=100000&offset=0",
    }),

    getPokemon: builder.query({
      query: (name) => "pokemon/" + name,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokedexApi;
