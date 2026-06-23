import { useState, useMemo, useEffect } from 'react';
import styles from '../styles/home.module.css'
import FrontPageComponent from '../components/screens/frontpage';
import LoadingComponent from '../components/ui/loading';
import { IGamesMockData } from '../types/games';
import { filterGames } from '../utils/genres';
import { useStore } from '../store/store';
import Layout from '../components/layout';
import { fetchGames } from '../services/api';
import { useQuery } from '@tanstack/react-query';

function Home() {
  const [filter, setFilter] = useState('All');
  const { setGames, search, games } = useStore();
  
  const { data, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => fetchGames(),
  });

  useEffect(() => {
    if (data) {
      const formatted = data.results.map(g => ({
        id: g.id,
        name: g.name,
        price: 99.90,
        description_raw: g.description_raw,
        genre: g.genres[0]?.name,
        rating: g.rating,
        class: g.esrb_rating?.name,
        img: g.background_image,
        specs: [],
        comments: []
      }));
      
      setGames(formatted);
    }
  }, [data, setGames]);

  const navigateTo = (path: string, game: IGamesMockData | null = null) => {
  };

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  }

  const filteredGames = useMemo(() =>
    filterGames(games, filter, search), [search, filter]);

  return (
    <Layout>
      <main className={styles.main}>
        <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
          <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <FrontPageComponent
                filter={filter}
                navigateTo={navigateTo}
                handleChangeFilter={handleChangeFilter}
                filteredGames={filteredGames}
              />
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home