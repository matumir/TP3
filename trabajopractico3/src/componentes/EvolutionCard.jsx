import { useEffect, useState } from "react";
import axios from "axios";

function EvolutionCard({ name }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemon(res.data));
  }, [name]);

  if (!pokemon) return null;

  return (
    <div className="card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} />
    </div>
  );
}

export default EvolutionCard;