import { useState, useMemo } from 'react';
import styles from '../styles/home.module.css'
import FrontPageComponent from '../components/screens/frontpage';
import LoadingComponent from '../components/ui/loading';
import { MOCK_GAMES } from '../mock/data';
import { IGamesMockData } from '../types/games';
import { filterGames } from '../utils/genres';
import { useStore } from '../store/store';
import Layout from '../components/layout';

function Home() {
  const [selectedGame, setSelectedGame] = useState<IGamesMockData | null>(null);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const { search } = useStore();

  const navigateTo = (path: string, game: IGamesMockData | null = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedGame(game);
      setIsLoading(false);
    }, 600);
  };

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  }

  const filteredGames = useMemo(() =>
    filterGames(MOCK_GAMES, filter, search), [search, filter]);

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