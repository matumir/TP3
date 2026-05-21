import { useEffect, useState } from "react";
import {getPokemon,getPokemons} from "./services/pokeapi";

import PokemonList from "./componentes/PokemonList";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pagina, setPagina] = useState(0);
  const limit = 20;

  useEffect(() => {
    getPokemons(limit, pagina * limit)
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((err) => console.log(err));
  }, [pagina]);

  const buscarPokemon = () => {
    if (!busqueda) return;

    setLoading(true);
    setError(false);

    getPokemon(busqueda)
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

  const limpiarBusqueda = () => {
    setPokemon(null);
    setBusqueda("");
    setError(false);
  };

  return (
    <div className="app">
      <h1>Pokédex</h1>

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

      <button onClick={limpiarBusqueda}>
        Volver a lista
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: Pokémon no encontrado</p>}

      {pokemon && !loading && !error && (
        <div className="card">
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

      {!pokemon && (
        <>
          <h2>Lista de Pokémon</h2>
          <PokemonList pokemons={pokemons} />

          <div className="pagination">
            <button
              onClick={() => setPagina(pagina - 1)}
              disabled={pagina === 0}
            >
              Anterior
            </button>

            <span> Página {pagina + 1} </span>

            <button
              onClick={() => setPagina(pagina + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;