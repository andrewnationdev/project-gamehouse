import { create } from 'zustand';

export const useStore = create((set) => ({
  cart: [],
  isCartOpen: false,
  view: "",
  search: "",
  games: [],
  setGames: (newGames) => set(() => ({ games: newGames })),
  addToCart: (game) => set((state) => ({ cart: [...state.cart, game] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((_, index) => index !== id) })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  navigateTo: (path: string) => set({ view: path }),
  handleSearch: (value: string) => set({ search: value })
}));
