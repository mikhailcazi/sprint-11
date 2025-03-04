import React, { useEffect, useState } from "react";
import { useGetPokemonQuery } from "../state/pokedexApi";
import { useAddPokemonMutation } from "../state/pokeCartApi";

export default function PokeInfo(props) {
  const { data: pokemon } = useGetPokemonQuery(props.name);
  const [pokemonInfo, setPokemonInfo] = useState();
  const [addPokemon] = useAddPokemonMutation();

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
          Gotta Catch 'Em All!
        </label>
      </div>
    </>
  );
}
