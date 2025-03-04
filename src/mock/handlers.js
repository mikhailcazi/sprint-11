// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const result = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  ],
};

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(result);
  }),

  http.post("http://example.com", () => {
    return HttpResponse.json({
      key: "value",
    });
  }),
];
