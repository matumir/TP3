import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemon = (name) => {
  return api.get(`/pokemon/${name}`);
};

export const getPokemons = (limit = 20,offset=0) => {
  return api.get("/pokemon", {
    params: { limit,offset },
  });
};