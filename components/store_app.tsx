import React, { useState, useMemo, useEffect } from 'react';
import { create } from 'zustand';
import { ChevronLeft, Star, Settings, Award} from 'lucide-react';
import { MOCK_GAMES } from '../mock/data';
import NavbarComponent from './navbar';
import FiltersComponent from './filters';
import CartDrawerComponent from './ui/cart';
import LoadingComponent from './ui/loading'
import GamesListComponent from './ui/games_list';

const useStore = create((set) => ({
  cart: [],
  isCartOpen: false,
  addToCart: (game) => set((state) => ({ cart: [...state.cart, game] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((_, index) => index !== id) })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export default function StoreApp() {
  const [view, setView] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  
  const { cart, addToCart, removeFromCart, isCartOpen, toggleCart } = useStore();

  const navigateTo = (newView: string, game = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedGame(game);
      setView(newView);
      setIsLoading(false);
    }, 600);
  };

  const handleSearch = (value:string) => {
    setSearch(value)
  }

  const handleChangeFilter = (value:string) => {
    setFilter(value);
  }

  const handleRemoveFromCart = (id:number) => {
    removeFromCart(id);
  }

  const filteredGames = useMemo(() => 
    MOCK_GAMES.filter(g => 
      (filter === 'All' || g.genre === filter) &&
      g.name.toLowerCase().includes(search.toLowerCase())
    ), [search, filter]);

  return (
    <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
      <NavbarComponent 
      title={'Project Gamehouse'} 
      navigateTo={navigateTo} 
      cart={cart} 
      toggleCart={toggleCart} 
      handleSearch={handleSearch}/>

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isLoading ? (
          <LoadingComponent/>
        ) : (
          <>
            {view === 'home' && (
              <main className="p-6">
                <FiltersComponent
                filter={filter}
                handleChangeFilter={handleChangeFilter}
                />
                <GamesListComponent
                  filteredGames={filteredGames!}
                  navigateTo={navigateTo}
                />
              </main>
            )}

            {view === 'detail' && selectedGame && (
              <div className="p-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2 mb-4 hover:text-white transition"><ChevronLeft /> Voltar</button>
                <div className="bg-[#2a475e] p-6 rounded shadow-xl">
                  <h2 className="text-3xl font-bold text-white">{selectedGame.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">{selectedGame.class}</span>
                    <span className="flex items-center gap-1 text-yellow-500"><Star size={16} fill="currentColor" /> {selectedGame.rating}</span>
                  </div>
                  <p className="mt-4 text-gray-300 italic leading-relaxed">"Este jogo incrível oferece horas de diversão. Explore mundos vastos, complete desafios e suba de nível nesta experiência imersiva."</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-bold text-green-400">R$ {selectedGame.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(selectedGame)} className="bg-green-600 px-8 py-3 rounded font-bold text-white hover:bg-green-500 transition shadow-lg">Adicionar ao Carrinho</button>
                  </div>
                  
                  <div className="mt-8 bg-[#171a21] p-4 rounded">
                      <h3 className="text-lg font-bold mb-2 text-white">Requisitos de Sistema</h3>
                      <ul className="text-sm text-gray-400 grid grid-cols-1 md:grid-cols-3 gap-2">
                          {selectedGame.specs.map((spec, i) => <li key={i} className="bg-[#1b2838] p-2 rounded">{spec}</li>)}
                      </ul>
                  </div>
                  
                  <div className="mt-6 bg-[#171a21] p-4 rounded">
                    <h3 className="text-lg font-bold mb-4 text-white">Comentários</h3>
                    <div className="space-y-4">
                      {selectedGame.comments.map((c, i) => (
                        <div key={i} className="border-b border-gray-700 pb-2 last:border-0">
                          <p className="text-sm font-bold text-blue-400">{c.user}</p>
                          <p className="text-sm text-gray-300 italic">"{c.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {view === 'profile' && (
              <div className="p-6 text-center max-w-lg mx-auto bg-[#2a475e] mt-10 rounded shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto flex items-center justify-center text-4xl">🎮</div>
                <h2 className="text-2xl mt-4 font-bold">Jogador Pro</h2>
                <p className="text-gray-400">Membro desde 2024</p>
                <div className="mt-6 flex justify-center gap-4">
                  <button className="flex items-center gap-2 bg-[#171a21] px-4 py-2 rounded"><Award size={18}/> Conquistas</button>
                  <button className="flex items-center gap-2 bg-[#171a21] px-4 py-2 rounded"><Settings size={18}/> Configurações</button>
                </div>
              </div>
            )}
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