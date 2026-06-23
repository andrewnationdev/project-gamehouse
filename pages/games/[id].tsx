import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from '../../styles/home.module.css'
import LoadingComponent from "../../components/ui/loading";
import { IGamesMockData } from "../../types/games";
import GameDetailsComponent from "../../components/screens/details";
import { useStore } from "../../store/store";
import { MOCK_GAMES } from "../../mock/data";
import { useRouter } from "next/router";

export default function GamesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState<IGamesMockData | null>(null);

    const router = useRouter();
    const {id} = router.query;

    const { addToCart } = useStore();

    const navigateTo = (path: string, game: IGamesMockData | null = null) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedGame(game);
            setIsLoading(false);
        }, 600);
    };

    useEffect(() => {
        const game = MOCK_GAMES.find((g) => String(g.id) == id);
        
        if(game){
            setSelectedGame(game);
            setIsLoading(false);
        }
    }, [id])

    return <Layout>
        <main className={styles.main}>
            <div
                className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
                <div
                    className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    {isLoading ? (
                        <LoadingComponent />
                    ) : (
                        <GameDetailsComponent
                            navigateTo={navigateTo}
                            selectedGame={selectedGame}
                            handleAddToCart={addToCart}
                        />
                    )}
                </div>
            </div>
        </main>
    </Layout>
}