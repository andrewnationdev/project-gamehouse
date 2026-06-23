import { create } from 'zustand';
import { IGame } from '../types/games';

interface IStore {
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

export const useStore = create(<IStore>(set) => ({
  cart: [],
  isCartOpen: false,
  search: "",
  games: [],
  setGames: (newGames) => set(() => ({ games: newGames })),
  addToCart: (game) => set((state) => ({ cart: [...state.cart, game] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((_, index) => index !== id) })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  handleSearch: (value: string) => set({ search: value })
}));
