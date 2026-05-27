import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons, onSelect, seleccionados }) {
  return (
    <div className="list">
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          onSelect={onSelect}
          selected={seleccionados?.some(p => p.name === pokemon.name)}
        />
      ))}
    </div>
  );
}

export default PokemonList;