import { MOCK_GAMES } from "../mock/data";
import { TGenres } from "../types/genres";

export const getGenres = (): TGenres[] => {
  const g:TGenres[] = ["All"];

  for(let game in MOCK_GAMES){
    if(!g.includes(MOCK_GAMES[game].genre)){
      g.push(MOCK_GAMES[game].genre)
    }
  }

  return g;
}