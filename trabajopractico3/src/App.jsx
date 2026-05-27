import { Routes, Route } from "react-router-dom";
import Home from "./componentes/Home";
import PokemonDetail from "./componentes/PokemonDetail";
import Evolutions from "./componentes/Evolutions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/pokemon/:id/evolutions" element={<Evolutions />} />
    </Routes>
  );
}

export default App;