import { ChevronLeft, Star } from "lucide-react";
import { IGameDetailsProps } from "../../types/games";
import Link from "next/link";

export default function GameDetailsComponent(props: IGameDetailsProps) {
    return <div className="p-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
        <Link href="/" className="flex items-center gap-2 mb-4 hover:text-white transition"><ChevronLeft /> Voltar</Link>
        <div className="bg-[#2a475e] p-6 rounded shadow-xl">
            <h2 className="text-3xl font-bold text-white">{props.selectedGame.name}</h2>
            <div className="flex items-center gap-4 mt-2">
                <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">{props.selectedGame.class}</span>
                <span className="flex items-center gap-1 text-yellow-500"><Star size={16} fill="currentColor" /> {props.selectedGame.rating}</span>
            </div>
            <p className="mt-4 text-gray-300 italic leading-relaxed">"Este jogo incrível oferece horas de diversão. Explore mundos vastos, complete desafios e suba de nível nesta experiência imersiva."</p>
            <div className="mt-6 flex items-center justify-between">
                <span className="text-3xl font-bold text-green-400">R$ {props.selectedGame.price.toFixed(2)}</span>
                <button onClick={() => props.handleAddToCart(props.selectedGame)} className="bg-green-600 px-8 py-3 rounded font-bold text-white hover:bg-green-500 transition shadow-lg">Adicionar ao Carrinho</button>
            </div>

            <div className="mt-8 bg-[#171a21] p-4 rounded">
                <h3 className="text-lg font-bold mb-2 text-white">Requisitos de Sistema</h3>
                <ul className="text-sm text-gray-400 grid grid-cols-1 md:grid-cols-3 gap-2">
                    {props.selectedGame.specs.map((spec, i) => <li key={i} className="bg-[#1b2838] p-2 rounded">{spec}</li>)}
                </ul>
            </div>

            <div className="mt-6 bg-[#171a21] p-4 rounded">
                <h3 className="text-lg font-bold mb-4 text-white">Comentários</h3>
                <div className="space-y-4">
                    {props.selectedGame.comments.map((c, i) => (
                        <div key={i} className="border-b border-gray-700 pb-2 last:border-0">
                            <p className="text-sm font-bold text-blue-400">{c.user}</p>
                            <p className="text-sm text-gray-300 italic">"{c.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div >
}