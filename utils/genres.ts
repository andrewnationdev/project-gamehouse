import { MOCK_GAMES } from "../mock/data";
import { IGame } from "../types/games";
import { TGenres } from "../types/genres";

export const getGenres = (): TGenres[] => {
  const g:TGenres[] = ["Todos"];

  for(let game in MOCK_GAMES){
    if(!g.includes(MOCK_GAMES[game].genre)){
      g.push(MOCK_GAMES[game].genre)
    }
  }

  return g;
}

export const filterGames = (games: IGame[], filter: TGenres, query: string) => {
  return games.filter(g =>
        (filter === 'Todos' || g.genre === filter) &&
        g.name.toLowerCase().includes(query.toLowerCase())
      )
}