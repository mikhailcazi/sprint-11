import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeCartApi = createApi({
  reducerPath: "pokeCartApi",
  tagTypes: ["MyCart"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/api/",
  }),
  endpoints: (builder) => ({
    getPokemonCollection: builder.query({
      query: () => {
        const token = localStorage.getItem("token");

        return {
          url: "pokemons",
          headers: {
            "Authorization": token
          }
        };
      },
      providesTags: ["MyCart"],
    }),

    addPokemon: builder.mutation({
      query: (pokemonInfo) => {
        const token = localStorage.getItem("token");

        return {
          url: "pokemons",
          method: "POST",
          body: pokemonInfo,
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          }
        };
      },
      invalidatesTags: ["MyCart"],
    }),
  }),
});

export const { useGetPokemonCollectionQuery, useAddPokemonMutation } =
  pokeCartApi;
