import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from '../../styles/home.module.css'
import LoadingComponent from "../../components/ui/loading";
import { IGamesMockData } from "../../types/games";
import GameDetailsComponent from "../../components/screens/details";
import { useStore } from "../../store/store";
import { MOCK_GAMES } from "../../mock/data";
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query';
import { fetchGameDetails } from '../../services/api';

export default function GamesPage() {
    const [selectedGame, setSelectedGame] = useState<IGamesMockData | null>(null);

    const router = useRouter();
    const { id } = router.query;

    const { addToCart, games } = useStore();

    const { data, isLoading } = useQuery({
        queryKey: ['game', id],
        queryFn: () => fetchGameDetails(id as string),
        enabled: !!id,
    });

    console.log(data)

    useEffect(() => {
        if (data) {
            const pcPlatform = data.platforms?.find(p => p.platform.slug === 'pc');
            const minSpecs = pcPlatform?.requirements?.minimum || "Não informado";
            const recSpecs = pcPlatform?.requirements?.recommended || "Não informado";

            const specsArray = [
                `Mínimo: ${minSpecs.replace('Minimum:', '')}`,
                `Recomendado: ${recSpecs.replace('Recommended:', '')}`
            ];

            const formatted = {
                ...data,
                id: data.id,
                name: data.name,
                price: 99.90,
                desc: data.description_raw,
                genre: data.genres[0]?.name,
                rating: data.rating,
                class: data.esrb_rating?.name || "Livre",
                img: data.background_image,
                specs: specsArray,
                comments: []
            };

            setSelectedGame(formatted);
        }
    }, [data]);

    return <Layout>
        <main className={styles.main}>
            <div
                className="min-h-screen bg-[#1b2838] text-gray-200 font-sans transition-all duration-500">
                <div
                    className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    {isLoading || !selectedGame ? (
                        <LoadingComponent />
                    ) : (
                        <GameDetailsComponent
                            id={selectedGame.id}
                            name={selectedGame.name}
                            price={0.00}
                            genre={selectedGame.genre} 
                            rating={selectedGame.rating} 
                            background_image={selectedGame.img} 
                            description_raw={selectedGame.desc} 
                            comments={[]}
                            handleAddToCart={addToCart}
                        />
                    )}
                </div>
            </div>
        </main>
    </Layout>
}