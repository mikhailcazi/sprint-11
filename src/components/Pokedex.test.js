import { render, screen } from "@testing-library/react";
import Pokedex from "./Pokedex";
import { Provider } from "react-redux";
import { store } from "../state/store";
import fetchPokemon from "../api/fetchPokemon";
import userEvent from "@testing-library/user-event";

jest.mock("../api/fetchPokemon.js");
jest.mock("./Pokemon-Login.js", () => () => <div>PokeLogin</div>);
jest.mock("./PokeCart", () => () => <div>PokeCart</div>);

describe("Pokedex", () => {
  beforeEach(() => {
    fetchPokemon.mockResolvedValue({
      count: 3,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [],
    });
  });

  test("should load the title Pokemon", () => {
    render(
      <Provider store={store}>
        <Pokedex />
      </Provider>
    );
    const title = screen.getByText("Pokedex");
    expect(title).toBeInTheDocument();
  });

  test("should load a list of pokemon in the side bar", async () => {
    fetchPokemon.mockResolvedValue({
      count: 3,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    });

    render(
      <Provider store={store}>
        <Pokedex />
      </Provider>
    );
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  });

  test("should show error message if pokemmon not available", async () => {
    fetchPokemon.mockResolvedValue(null);

    render(
      <Provider store={store}>
        <Pokedex />
      </Provider>
    );
    expect(await screen.findByText("No Pokemon")).toBeInTheDocument();
  });

  test("when user clicks a pokemon name, the details show up", async () => {
    // Arrange
    const user = userEvent.setup();
    fetchPokemon.mockResolvedValue({
      count: 3,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    });
    render(
      <Provider store={store}>
        <Pokedex />
      </Provider>
    );

    // Act
    const pokemonToBeClicked = await screen.findByText("squirtle");
    await user.click(pokemonToBeClicked);

    // Assert
    expect(screen.getByAltText("pokemon-info-image")).toBeInTheDocument();
  });
});
