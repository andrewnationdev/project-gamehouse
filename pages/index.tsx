import { useState, useMemo, useEffect } from 'react';
import styles from '../styles/home.module.css'
import FrontPageComponent from '../components/screens/frontpage';
import LoadingComponent from '../components/ui/layout/loading';
import { filterGames } from '../utils/genres';
import { useStore } from '../store/store';
import Layout from '../components/ui/layout/layout';
import { fetchGames } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { calculateGamePrice } from '../utils/data';

function Home() {
  const [filter, setFilter] = useState('Todos');
  const { setGames, search, games } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['games'],
    queryFn: () => fetchGames(),
  });

  useEffect(() => {
    if (data) {
      const formatted = data.results.map(g => ({
        id: g.id,
        name: g.name,
        price: calculateGamePrice(g.released),
        description_raw: g.description_raw,
        genre: g.genres[0]?.name,
        rating: g.rating,
        class: g.esrb_rating?.name,
        background_image: g.background_image,
        specs: [],
        comments: []
      }));

      console.log(data)

      setGames(formatted);
    }
  }, [data, setGames]);

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  }

  const filteredGames = useMemo(() => {
    if (!games || games.length === 0) return [];
    return filterGames(games, filter, search);
  }, [search, filter, games]);

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
              handleChangeFilter={(v) => setFilter(v)}
              filteredGames={filteredGames}
              isError={isError}
            />
          )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home