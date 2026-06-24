import { create } from 'zustand';
import {IStore} from '../types/store';

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
