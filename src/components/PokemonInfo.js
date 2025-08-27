import React, { useEffect, useState } from "react";
import { useGetPokemonQuery } from "../state/pokedexApi";
import { useAddPokemonMutation } from "../state/pokeCartApi";

export default function PokeInfo(props) {
  const { data: pokemon } = useGetPokemonQuery(props.name);
  const [pokemonInfo, setPokemonInfo] = useState();
  const [addPokemon] = useAddPokemonMutation();

  // const addPokemon = () => {
  //   const URL = "http://localhost:9009/api/pokemons";

  //   fetch(URL, { method: "POST", body: pokemonInfo, })
  //     .then((response) => {
  //       if (!response.ok) throw new Error("Fetch Error");

  //       if (response.headers.get("Content-Type").includes("json"))
  //         return response.json();

  //       return response.body();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  useEffect(() => {
    setPokemonInfo({
      name: props.name,
      img: pokemon?.sprites["front_default"],
    });
  }, [pokemon]);

  return (
    <>
      <h2>{props.name.toUpperCase()}</h2>

      <div>
        <img alt="pokemon-info-image" src={pokemon?.sprites["front_default"]} />
      </div>
      <div
        className="catch-button"
        onClick={() => addPokemon(JSON.stringify(pokemonInfo))}
      >
        <img
          src="images/pokeball.png"
          style={{ width: 20, cursor: "pointer" }}
        />
        <label style={{ padding: "0px 10px", cursor: "pointer" }}>
    Add Pokemon
        </label>
      </div>
    </>
  );
}
