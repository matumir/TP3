import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
    const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/mewtwo")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h1>PokeAPI Test</h1>

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}


export default App
