import { useNavigate } from "react-router-dom";

function PokemonCard({ pokemon, onSelect, selected  }) {
  const navigate = useNavigate();

  const id = pokemon.url.split("/")[6];

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div
      className={`card ${selected ? "selected" : ""}`}
      onClick={() => {
          if (onSelect) {
            onSelect(pokemon);
          } else {
            navigate(`/pokemon/${id}`);
          }
        }
      }
    >
      <img src={image} />
      <p>#{id}</p>
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default PokemonCard;