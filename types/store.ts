import { IGame } from "./games";

export interface IStore {
  cart: IGame[] | [];
  isCartOpen: boolean;
  search: string;
  games: IGame[] | [];
  setGames: (newGames: IGame[]) => void;
  addToCart: (game: IGame) => void;
  removeFromCart: (id: number) => void;
  toggleCart: () => void;
  handleSearch: (value: string) => void;
}