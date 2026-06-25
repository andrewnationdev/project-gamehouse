import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../store/store";
import { IGame } from "../../../types/games";
import { fetchGames } from "../../../services/api";
import Loading from "../layout/loading";
import StatusMessage from "./status_message";
import PlayedGameItem from "./played_game_card";
import { useEffect, useState } from "react";

export default function UserPlayedGamesComponent(props: { userId: string; }) {
    const [playedGames, setPlayedGames] = useState<IGame[]>([]);
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['games'],
        queryFn: () => fetchGames(),
    });

    useEffect(()=>{
        if(data){
            const selectFiveRandomItems = () => {
                const shuffled = data.results.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, 5);
            };
            setPlayedGames(selectFiveRandomItems());
        }
    },[data]);

    return <div className="border-t border-gray-700 pb-2 p-6 text-center max-w-lg mx-auto bg-[#2a475e] mt-10 rounded shadow-2xl animate-in fade-in zoom-in duration-500">
        <h1 className="text-2xl font-bold text-white mb-4">Histórico de Jogos</h1>
        {isLoading && !isError ? <Loading /> : isError ? <StatusMessage
            type="error"
            message="NÃO HÁ JOGOS PARA EXIBIR AQUI"
        /> : <div>
            {playedGames.map((game: IGame) => <PlayedGameItem key={game.id} userId={props.userId} game={game} />)}
        </div>}
    </div>
}