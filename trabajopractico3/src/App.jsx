import { Routes, Route } from "react-router-dom";
import Home from "./componentes/Home";
import PokemonDetail from "./componentes/PokemonDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;