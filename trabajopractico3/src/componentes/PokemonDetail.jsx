import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";


function PokemonDetail({ id, name }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  

  const [pokemon, setPokemon] = useState(null);
  const reproducirGrito = () => {
    const audio = new Audio(pokemon.cries.latest);
    audio.play();
  };

useEffect(() => {
  const value = id || name || paramId;

  if (!value) return;

  setPokemon(null);

  getPokemon(value)
    .then((res) => setPokemon(res.data))
    .catch(console.log);

}, [id, name, paramId]);

  if (!pokemon) return <p>Cargando...</p>;
  const mainType = pokemon.types[0].type.name;

  return (
    <div className={`detail type-${mainType}`}>
      <h1>{pokemon.name}</h1>

      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name}/>

      <h3>Tipos</h3>
      {pokemon.types.map((t) => (
        <span key={t.type.name} className={`type ${t.type.name}`}>
          {t.type.name}
        </span>
      ))}

      <h3>Habilidades</h3>
      {pokemon.abilities.map((a) => (
        <p key={a.ability.name}> {a.ability.name}</p>
      ))}

      <h3>Estadísticas</h3>
      {pokemon.stats.map((s) => (
        <div className="stat" key={s.stat.name}>
          <p> {s.stat.name}: {s.base_stat}</p>

          <div className="stat-bar">
            <div className="stat-fill" style={{
                width: `${s.base_stat / 2}%`,
              }}
            />
          </div>
        </div>
      ))}

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        Volver
      </button>
      <button onClick={() => navigate(`/pokemon/${pokemon.id}/evolutions`)}>
        Evoluciones
      </button>
      <button onClick={reproducirGrito}>
        Grito 🔊
      </button>
    </div>
  );
}

export default PokemonDetail;