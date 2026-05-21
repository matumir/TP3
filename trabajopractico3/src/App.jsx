import { useEffect, useState } from "react";
import axios from 'axios'
import { getPokemon } from "./services/pokeapi";
import './App.css'

function App() {
  
  const [pokemon, setPokemon] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const buscarPokemon = () => {
    if (!busqueda) return;

    setLoading(true);
    setError(false);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setPokemon(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>PokeAPI Test</h1>

      <input
        type="text"
        placeholder="Nombre o ID"
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
      />

      <button onClick={buscarPokemon}>
        Buscar
      </button>

      {loading && <p>Cargando...</p>}

      {error && <p>Error: Pokémon no encontrado</p>}

      {pokemon && !loading && !error && (
        <div>
          <h2>{pokemon.name}</h2>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <p>ID: #{pokemon.id}</p>
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}


export default App
