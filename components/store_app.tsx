import React, { useState, useMemo, useEffect } from 'react';
import { create } from 'zustand';
import { ShoppingCart, Trash2, Gamepad2, X, Search, User, ChevronLeft, Star, Settings, Award, Loader2 } from 'lucide-react';

// Estado global (Zustand)
const useStore = create((set) => ({
  cart: [],
  isCartOpen: false,
  addToCart: (game) => set((state) => ({ cart: [...state.cart, game] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((_, index) => index !== id) })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

const MOCK_GAMES = [
  { id: 1, name: 'Cyberpunk 2077', price: 199.90, desc: 'RPG futurista.', genre: 'RPG', rating: 4.5, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/26d/26d4437715064e43590559a47394c8e7.jpg', specs: ['Windows 10', 'Core i7', '16GB RAM'], comments: [{user: 'CyberFan', text: 'Melhor RPG que já joguei!'}, {user: 'GamerX', text: 'Gráficos impressionantes.'}] },
  { id: 2, name: 'Elden Ring', price: 249.90, desc: 'Ação épica.', genre: 'Action', rating: 4.9, class: 'TEEN', img: 'https://images.rawg.io/media/games/d1a/d1a2e99491757850811027170815777a.jpg', specs: ['Windows 10', 'Core i5', '12GB RAM'], comments: [{user: 'Tarnished', text: 'Dificuldade na medida certa.'}] },
  { id: 3, name: 'Baldur\'s Gate 3', price: 299.90, desc: 'Aventura RPG.', genre: 'RPG', rating: 5.0, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/6fc/6fcf473b62f2736780c85c6978119864.jpg', specs: ['Windows 11', 'Ryzen 5', '16GB RAM'], comments: [{user: 'DungeonMaster', text: 'Uma obra-prima dos RPGs!'}] },
  { id: 4, name: 'Stardew Valley', price: 24.90, desc: 'Simulação relaxante.', genre: 'RPG', rating: 4.8, class: 'LIVRE', img: 'https://images.rawg.io/media/games/85c/85c8ae70e7df510f545a901d8e13e01d.jpg', specs: ['Windows 7', 'Dual Core', '4GB RAM'], comments: [{user: 'ChillGamer', text: 'Perfeito para relaxar.'}] },
  { id: 5, name: 'The Witcher 3', price: 119.90, desc: 'Fantasia sombria.', genre: 'RPG', rating: 4.9, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/618/618c2031a07bbff6b4b61136d88c42a5.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'GeraltFan', text: 'O melhor mundo aberto!'}] },
  { id: 6, name: 'Red Dead Redemption 2', price: 239.90, desc: 'Vida no velho oeste.', genre: 'Action', rating: 4.9, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/511/5118d67b4731215183358e5797f707f1.jpg', specs: ['Windows 10', 'Core i7', '16GB RAM'], comments: [{user: 'Outlaw', text: 'História emocionante.'}] },
  { id: 7, name: 'Hollow Knight', price: 49.90, desc: 'Metroidvania desafiador.', genre: 'Action', rating: 4.8, class: 'TEEN', img: 'https://images.rawg.io/media/games/043/043ac64a00062777172244243555541e.jpg', specs: ['Windows 10', 'Core i3', '4GB RAM'], comments: [{user: 'KnightFan', text: 'Trilha sonora incrível.'}] },
  { id: 8, name: 'God of War Ragnarök', price: 299.90, desc: 'Mitologia nórdica.', genre: 'Action', rating: 4.9, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/b8c/b8c243f5506b12f6d36a0664d603a115.jpg', specs: ['Windows 11', 'Core i7', '16GB RAM'], comments: [{user: 'KratosFan', text: 'Final épico.'}] },
  { id: 9, name: 'Minecraft', price: 99.00, desc: 'Construção infinita.', genre: 'Sandbox', rating: 4.7, class: 'LIVRE', img: 'https://images.rawg.io/media/games/d81/d813331b263673f4438318f77341050e.jpg', specs: ['Windows 10', 'Dual Core', '4GB RAM'], comments: [{user: 'BlockBuilder', text: 'Infinitas possibilidades.'}] },
  { id: 10, name: 'Grand Theft Auto V', price: 89.90, desc: 'Ação urbana.', genre: 'Action', rating: 4.6, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/20a/20aa03c10c641ecd412258d30b643a3d.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'LosSantosPro', text: 'Clássico imbatível.'}] },
  { id: 11, name: 'Hades', price: 79.90, desc: 'Roguelike frenético.', genre: 'Action', rating: 4.9, class: 'TEEN', img: 'https://images.rawg.io/media/games/6e7/6e75a6c11c4c1a539b71d9f829ec96c3.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'ZagreusFan', text: 'Viciante demais!'}] },
  { id: 12, name: 'Portal 2', price: 19.90, desc: 'Puzzle cerebral.', genre: 'Puzzle', rating: 4.9, class: 'LIVRE', img: 'https://images.rawg.io/media/games/328/3283617e3d73507b27599c426e382d56.jpg', specs: ['Windows 7', 'Dual Core', '2GB RAM'], comments: [{user: 'GLaDOS', text: 'O bolo é uma mentira.'}] },
  { id: 13, name: 'Terraria', price: 19.90, desc: 'Aventura em 2D.', genre: 'Sandbox', rating: 4.7, class: 'TEEN', img: 'https://images.rawg.io/media/games/0fd/0fd8313d332213d2f3d64357c32442cf.jpg', specs: ['Windows 10', 'Dual Core', '4GB RAM'], comments: [{user: 'MinerGuy', text: 'Muito conteúdo.'}] },
  { id: 14, name: 'Celeste', price: 36.90, desc: 'Plataforma preciso.', genre: 'Platformer', rating: 4.8, class: 'LIVRE', img: 'https://images.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg', specs: ['Windows 10', 'Dual Core', '4GB RAM'], comments: [{user: 'SpeedRunner', text: 'Desafio justo.'}] },
  { id: 15, name: 'Elden Ring: Shadow of the Erdtree', price: 159.90, desc: 'Expansão épica.', genre: 'Action', rating: 5.0, class: 'TEEN', img: 'https://images.rawg.io/media/games/569/56926955743457193240212727670f5e.jpg', specs: ['Windows 10', 'Core i7', '16GB RAM'], comments: [{user: 'Tarnished', text: 'Dificuldade absurda!'}] },
  { id: 16, name: 'Resident Evil 4', price: 249.00, desc: 'Survival Horror.', genre: 'Action', rating: 4.8, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/1f4/1f47a258b884d63428383f98018e692e.jpg', specs: ['Windows 10', 'Core i7', '16GB RAM'], comments: [{user: 'LeonFan', text: 'Remake perfeito.'}] },
  { id: 17, name: 'Doom Eternal', price: 129.90, desc: 'FPS frenético.', genre: 'Shooter', rating: 4.7, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/188/188a37c8e6a172a6b251f22e23293847.jpg', specs: ['Windows 10', 'Core i7', '8GB RAM'], comments: [{user: 'DoomGuy', text: 'Rip and tear!'}] },
  { id: 18, name: 'Dark Souls III', price: 159.90, desc: 'Desafio sombrio.', genre: 'Action', rating: 4.7, class: 'MATURE 17+', img: 'https://images.rawg.io/media/games/d87/d87870308d374d852a466a938b813732.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'AshenOne', text: 'Clássico.'}] },
  { id: 19, name: 'Cuphead', price: 59.90, desc: 'Arte vintage.', genre: 'Platformer', rating: 4.7, class: 'LIVRE', img: 'https://images.rawg.io/media/games/6e6/6e6a3250122e2a76f2a11723c3482a0d.jpg', specs: ['Windows 10', 'Core i3', '4GB RAM'], comments: [{user: 'CartoonFan', text: 'Visual único.'}] },
  { id: 20, name: 'Outer Wilds', price: 57.90, desc: 'Exploração espacial.', genre: 'Adventure', rating: 4.9, class: 'LIVRE', img: 'https://images.rawg.io/media/games/698/698cdb08f9db06222d4e672728f440a3.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'SpaceExpl', text: 'Melhor jogo de mistério.'}] },
  { id: 21, name: 'Dave the Diver', price: 79.90, desc: 'Aventura submarina.', genre: 'Adventure', rating: 4.8, class: 'LIVRE', img: 'https://images.rawg.io/media/games/d58/d588947b42502280d5656910609b6910.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'SushiLover', text: 'Viciante.'}] },
  { id: 22, name: 'Valorant', price: 0.00, desc: 'FPS Tático.', genre: 'Shooter', rating: 4.3, class: 'TEEN', img: 'https://images.rawg.io/media/games/531/531777b738122d26f316d3f2955cfd80.jpg', specs: ['Windows 10', 'Core i5', '4GB RAM'], comments: [{user: 'TacticalPro', text: 'Muito competitivo.'}] },
  { id: 23, name: 'Sea of Thieves', price: 149.00, desc: 'Piratas em alto mar.', genre: 'Adventure', rating: 4.5, class: 'TEEN', img: 'https://images.rawg.io/media/games/13a/13a07119f1e16f3918a99496a7516d26.jpg', specs: ['Windows 10', 'Core i5', '8GB RAM'], comments: [{user: 'PirateKing', text: 'Diversão com amigos.'}] },
  { id: 24, name: 'Rocket League', price: 0.00, desc: 'Futebol com carros.', genre: 'Sports', rating: 4.4, class: 'LIVRE', img: 'https://images.rawg.io/media/games/840/84045f284e9d3d346761f0d3674685ef.jpg', specs: ['Windows 10', 'Core i5', '4GB RAM'], comments: [{user: 'RocketMaster', text: 'Muito divertido.'}] }
];

const getGenres = () => {
  const g = ["All"];

  for(let game in MOCK_GAMES){
    if(!g.includes(MOCK_GAMES[game].genre)){
      g.push(MOCK_GAMES[game].genre)
    }
  }

  return g;
}

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

  const filteredGames = useMemo(() => 
    MOCK_GAMES.filter(g => 
      (filter === 'All' || g.genre === filter) &&
      g.name.toLowerCase().includes(search.toLowerCase())
    ), [search, filter]);

  return (
    <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
      
      {/* Navbar */}
      <nav className="bg-[#171a21] p-4 flex items-center justify-between sticky top-0 z-10 shadow-lg border-b border-[#2a475e]">
        <h1 className="text-xl font-bold cursor-pointer text-white hover:text-blue-400 transition" onClick={() => navigateTo('home')}>GamerStore</h1>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2 text-gray-400" size={18}/>
            <input className="bg-[#2a475e] pl-8 p-1 rounded text-sm w-32 md:w-48 transition-all focus:w-64" placeholder="Buscar..." onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={() => navigateTo('profile')} className="hover:text-blue-400 transition"><User /></button>
          <button onClick={toggleCart} className="relative transition hover:scale-110">
            <ShoppingCart />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold text-white">{cart.length}</span>}
          </button>
        </div>
      </nav>

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
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {getGenres().map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1 rounded-full transition ${filter === f ? 'bg-[#66c0f4] text-black' : 'bg-[#2a475e] hover:bg-[#3d688a]'}`}>{f}</button>
                  ))}
                </div>
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