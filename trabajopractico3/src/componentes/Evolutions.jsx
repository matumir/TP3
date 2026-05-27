import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EvolutionCard from "./EvolutionCard";

function Evolutions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        
        const pokemonRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        
        const speciesRes = await axios.get(
          pokemonRes.data.species.url
        );

        
        const evolutionRes = await axios.get(
          speciesRes.data.evolution_chain.url
        );

        
        const chain = evolutionRes.data.chain;

        const evoArray = [];

        let current = chain;

        while (current) {
          evoArray.push(current.species.name);
          current = current.evolves_to[0];
        }

        setEvolutions(evoArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutions();
  }, [id]);

  return (
  <div className="detail">
    <h1>Evoluciones</h1>

    <div className="evolution-container">
  {evolutions.map((name, index) => (
    <>
      <EvolutionCard key={name} name={name} />
      {index < evolutions.length - 1 && (
        <span className="arrow">→</span>
      )}
    </>
  ))}
</div>

    <button onClick={() => navigate(-1)}>
      Volver
    </button>
  </div>
);
}

export default Evolutions;