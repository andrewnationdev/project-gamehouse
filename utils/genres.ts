import { MOCK_GAMES } from "../mock/data";
import { IGamesMockData } from "../types/games";
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

export const filterGames = (games: IGamesMockData[], filter: TGenres, query: string) => {
  return games.filter(g =>
        (filter === 'All' || g.genre === filter) &&
        g.name.toLowerCase().includes(query.toLowerCase())
      )
}