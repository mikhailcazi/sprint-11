import React, { useEffect, useState } from "react";
import PokeInfo from "./PokemonInfo";
import { useGetPokemonListQuery } from "../state/pokedexApi";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import PokeCart from "./PokeCart";
import fetchPokemon from "../api/fetchPokemon";
import Login from "./Pokemon-Login";

export default function Pokedex() {
  let { data: pokemonList } = useGetPokemonListQuery();

  const [myPokemon, setMyPokemon] = useState("");
  return (
    <>
      <BrowserRouter>
        <div className="pokedex-header">
          <span style={{ fontSize: "xxx-large", marginRight: 50 }}>
            Pokedex
          </span>
          <div className="header-menu">
            <NavLink to="/">Login</NavLink>
            <NavLink to="pokemon">Poke-Collection</NavLink>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 250 }}>
            <div className="pokemon-list">
              {pokemonList
                ? pokemonList?.results.map((pokemon) => (
                    <div
                      className="pokemon-item"
                      key={pokemon.name}
                      onClick={() => setMyPokemon(pokemon.name)}
                    >
                      {pokemon.name}
                    </div>
                  ))
                : "No Pokemon"}
            </div>
          </div>
          <div className="pokemon-display">
            {myPokemon && <PokeInfo name={myPokemon} />}
          </div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="pokemon" element={<PokeCart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
