import React, { useState, useMemo, useEffect } from 'react';
import { create } from 'zustand';
import { ChevronLeft, Star, Settings, Award } from 'lucide-react';
import { MOCK_GAMES } from '../mock/data';
import NavbarComponent from './navbar';
import FiltersComponent from './filters';
import CartDrawerComponent from './ui/cart';
import LoadingComponent from './ui/loading'
import GamesListComponent from './ui/games_list';
import ProfileComponent from './screens/profile';
import { IGamesMockData } from '../types/games';
import GameDetailsComponent from './screens/details';
import { filterGames } from '../utils/genres';
import FrontPageComponent from './screens/frontpage';

const useStore = create((set) => ({
  cart: [],
  isCartOpen: false,
  addToCart: (game) => set((state) => ({ cart: [...state.cart, game] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((_, index) => index !== id) })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export default function StoreApp() {
  const [view, setView] = useState('home');
  const [selectedGame, setSelectedGame] = useState<IGamesMockData | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const { cart, addToCart, removeFromCart, isCartOpen, toggleCart } = useStore();

  const navigateTo = (path: string, game: IGamesMockData | null = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedGame(game);
      setView(path);
      setIsLoading(false);
    }, 600);
  };

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  }

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
  }

  const handleAddToCart = (game: IGamesMockData) => {
    addToCart(game);
  }

  const filteredGames = useMemo(() =>
    filterGames(MOCK_GAMES, filter, search), [search, filter]);

  return (
    <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
      <NavbarComponent
        title={'Project Gamehouse'}
        navigateTo={navigateTo}
        cart={cart}
        toggleCart={toggleCart}
        handleSearch={handleSearch} />

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            {view === 'home' && (
              <FrontPageComponent
                filter={filter}
                navigateTo={navigateTo}
                handleChangeFilter={handleChangeFilter}
                filteredGames={filteredGames}
              />
            )}

            {view === 'detail' && selectedGame && (
              <GameDetailsComponent
                navigateTo={navigateTo}
                selectedGame={selectedGame}
                handleAddToCart={handleAddToCart}
              />
            )}

            {view === 'profile' &&
              <ProfileComponent />
            }
          </>
        )}
      </div>

      {isCartOpen && (
        <CartDrawerComponent
          cart={cart}
          toggleCart={toggleCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      )}
    </div>
  );
}