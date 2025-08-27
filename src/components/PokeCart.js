import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPokemonCollectionQuery } from "../state/pokeCartApi";

export default function PokeCart() {
  const { data: pokemonList } = useGetPokemonCollectionQuery();
  fetch("/pokemon").then()
  .catch(err => {
    if (err = 401) {
      nav("/")
    }
  })

  const nav = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    nav("/");
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if(!token) {
      nav("/")
    }
  })

  return (
    <div className="pokemon-cart">
      <button onClick={logout}>Logout</button>
      <div className="cart-header">
        <span>Collection</span>
      </div>
      <div>
        <div className="cart-body">
          {pokemonList?.length > 0 ? (
            pokemonList.map((pokemon) => (
              <div key={pokemon.name} style={{ textAlign: "center" }}>
                <img src={pokemon.img} />
                <span style={{ position: "relative", top: "-20px" }}>
                  {pokemon.name}
                </span>
              </div>
            ))
          ) : (
            <span>No pokemon added!</span>
          )}
        </div>
      </div>
    </div>
  );
}
