import { useEffect, useState } from "react";
import axios from 'axios'
import './App.css'

function App() {
  
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/mew")
      .then((response) => {
        console.log(response);
        setPokemon(response.data);
      })
  
      .catch((error) => {
        console.log("Error:", error);
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
