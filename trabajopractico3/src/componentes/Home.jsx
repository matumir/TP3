import { useEffect, useState } from "react";
import {getPokemon,getPokemons} from "../services/pokeapi";

import PokemonDetail from "./PokemonDetail";
import PokemonList from "./PokemonList";
import "../App.css";

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pagina, setPagina] = useState(0);
  const limit = 20;

  const [modoComparar, setModoComparar] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);

  const seleccionarPokemon = (pokemon) => {
    const yaExiste = seleccionados.find(p => p.name === pokemon.name);

    if (yaExiste) {
      setSeleccionados(seleccionados.filter(p => p.name !== pokemon.name));
      return;
    }
    if (seleccionados.length < 2) {
      setSeleccionados([...seleccionados, pokemon]);
    }
  s};

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
    setModoComparar(false);
    setSeleccionados([]);
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
      <button onClick={() => {
        if (modoComparar) {
          setModoComparar(false);
          setSeleccionados([]);
        } else {
          setModoComparar(true);
          setSeleccionados([]);
        }
        }}
      >
        Comparar
      </button>
      <button onClick={limpiarBusqueda}>
        Volver a lista
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: Pokémon no encontrado</p>}

      {pokemon && !loading && !error && (
        <div className="card2">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default}alt={pokemon.name}/>
          <p>ID: #{pokemon.id}</p>
          <a className="btndet" href={`/pokemon/${pokemon.id}`}>
            Ver detalle
          </a>
        </div>
      )}

      {!pokemon && !modoComparar &&(
        <>
          <h2>Lista de Pokémon</h2>
          <PokemonList pokemons={pokemons} onSelect={modoComparar ? seleccionarPokemon : null} seleccionados={seleccionados}/>

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
      {modoComparar && (
        <>
          <h2>Comparar Pokémon</h2>
          {seleccionados.length < 2 && (
            <>
              <p>Seleccioná {2 - seleccionados.length} Pokémon</p>

              <PokemonList
                pokemons={pokemons}
                onSelect={seleccionarPokemon}
                seleccionados={seleccionados}
              />
            </>
          )}
          {seleccionados.length === 2 && (
            <div className="compare-container">
              {seleccionados.map((p) => (
                <PokemonDetail key={p.name} name={p.name} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;