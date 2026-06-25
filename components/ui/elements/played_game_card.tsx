import Link from "next/link";
import { IGame } from "../../../types/games";
import { truncate } from "../../../utils/truncate";
import { Trophy } from "lucide-react";

export default function PlayedGameItem(props: {
    game: IGame;
    userId: string;
}) {

    const gameCompletion = () => {
        return Math.floor(Math.random() * 100) + 1;
    }

    const getTrophies = () => {
        const firstNumber = Math.floor(Math.random() * 5) + 1;
        const secondNumber = firstNumber + Math.floor(Math.random() * 10) + 10;

        if (secondNumber > 99) {
            return `${firstNumber} / 99`;
        }

        return `${firstNumber} / ${secondNumber}`;
    }

    return <div>
        <Link href={`/games/${props.game.id}`}><div key={props.game.id} className="flex flex-row items-center bg-slate-800 my-4 p-4 rounded hover:scale-105 transition-transform cursor-pointer shadow-md">
            <img src={props.game.background_image} className="w-16 h-16 object-cover rounded" alt={props.game.name} />
            <div className="flex flex-col items-start justify-start ml-8">
                <h2 className="font-bold text-white text-left text-xs">{truncate(props.game.name)}</h2>
                <div className="mt-4">
                    <span className="font-bold text-white text-xs">{gameCompletion()}%  CONCLUÍDO</span>
                </div>
            </div>
            <div className="ml-auto">
                <span className="flex flex-col items-center font-bold text-white text-xs">
                    <Trophy className="mr-1 mb-4 text-yellow-500" />
                    {getTrophies()}</span>
            </div>
        </div>
        </Link>
    </div>
}