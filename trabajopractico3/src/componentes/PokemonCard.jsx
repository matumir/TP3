function PokemonCard({ pokemon, index }) {

  const id = pokemon.url.split("/")[6];

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="card">
      <img src={image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>#{id}</p>
    </div>
  );
}

export default PokemonCard;