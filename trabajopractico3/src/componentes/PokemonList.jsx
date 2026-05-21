import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons }) {
  return (
    <div className="list">
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          index={index}
        />
      ))}
    </div>
  );
}

export default PokemonList;