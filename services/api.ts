const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export const fetchGames = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}`);
  if (!res.ok) throw new Error('Falha ao buscar jogos');
  return res.json();
};

export const fetchGameDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error('Falha ao buscar detalhes');
  return res.json();
};