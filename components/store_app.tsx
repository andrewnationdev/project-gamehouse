import React, { useState, useMemo, useEffect } from 'react';
import { create } from 'zustand';
import { Trash2, X, ChevronLeft, Star, Settings, Award, Loader2 } from 'lucide-react';
import { MOCK_GAMES } from '../mock/data';
import { getGenres } from '../utils/genres';
import NavbarComponent from './navbar';
import FiltersComponent from './filters';

// Estado global (Zustand)
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

  // Simulação de carregamento ao trocar de tela
  const navigateTo = (newView, game = null) => {
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

  const filteredGames = useMemo(() => 
    MOCK_GAMES.filter(g => 
      (filter === 'All' || g.genre === filter) &&
      g.name.toLowerCase().includes(search.toLowerCase())
    ), [search, filter]);

  return (
    <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
      
      {/* Navbar */}
      <NavbarComponent 
      title={'Project Gamehouse'} 
      navigateTo={navigateTo} 
      cart={cart} 
      toggleCart={toggleCart} 
      handleSearch={handleSearch}/>

      {/* Conteúdo com transição e loading */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
             <Loader2 className="animate-spin text-blue-400" size={48} />
          </div>
        ) : (
          <>
            {view === 'home' && (
              <main className="p-6">
                <FiltersComponent
                filter={filter}
                handleChangeFilter={handleChangeFilter}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-500">
                  {filteredGames.map(game => (
                    <div key={game.id} className="bg-[#2a475e] p-4 rounded hover:scale-105 transition-transform cursor-pointer shadow-md" onClick={() => navigateTo('detail', game)}>
                      <img src={game.img} className="w-full h-40 object-cover rounded" alt={game.name} />
                      <h2 className="font-bold mt-2 text-white">{game.name}</h2>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-green-400">R$ {game.price.toFixed(2)}</span>
                        <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{game.class}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
      
      {/* Drawer Carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 transition-opacity" onClick={toggleCart}>
          <div className="absolute right-0 top-0 w-80 h-full bg-[#1b2838] p-6 shadow-2xl border-l border-gray-700 animate-in slide-in-from-right" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl text-white">Carrinho</h2>
              <button onClick={toggleCart}><X /></button>
            </div>
            <div className="space-y-4">
              {cart.length === 0 && <p className="text-gray-500 text-center mt-10">Carrinho vazio.</p>}
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-green-400">R$ {item.price.toFixed(2)}</span>
                    <button onClick={() => removeFromCart(i)} className="text-red-500 hover:text-red-300"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && <button className="w-full mt-6 bg-green-600 py-3 rounded font-bold hover:bg-green-500 transition shadow-lg">Finalizar Compra</button>}
          </div>
        </div>
      )}
    </div>
  );
}