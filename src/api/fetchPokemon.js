const fetchPokemon = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

export default fetchPokemon;
