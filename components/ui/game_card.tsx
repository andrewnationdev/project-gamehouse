import { IGameCardProps } from "../../types/games";

export default function GameCardComponent(props:IGameCardProps){
    return <div key={props.game.id} className="bg-[#2a475e] p-4 rounded hover:scale-105 transition-transform cursor-pointer shadow-md" onClick={() => props.navigateTo('detail', props.game)}>
                <img src={props.game.img} className="w-full h-40 object-cover rounded" alt={props.game.name} />
                <h2 className="font-bold mt-2 text-white">{props.game.name}</h2>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-green-400">R$ {props.game.price.toFixed(2)}</span>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{props.game.class}</span>
                </div>
            </div>
}