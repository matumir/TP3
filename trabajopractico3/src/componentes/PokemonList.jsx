function PokemonList({ pokemons }) {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>
          {pokemon.name}
        </p>
      ))}
    </div>
  );
}

export default PokemonList;