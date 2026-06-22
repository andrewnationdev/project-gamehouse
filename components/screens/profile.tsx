import { Award, Settings } from "lucide-react";

export default function ProfileComponent() {
    return <div className="p-6 text-center max-w-lg mx-auto bg-[#2a475e] mt-10 rounded shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto flex items-center justify-center text-4xl">🎮</div>
        <h2 className="text-2xl mt-4 font-bold">Jogador Pro</h2>
        <p className="text-gray-400">Membro desde 2024</p>
        <div className="mt-6 flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-[#171a21] px-4 py-2 rounded"><Award size={18} /> Conquistas</button>
            <button className="flex items-center gap-2 bg-[#171a21] px-4 py-2 rounded"><Settings size={18} /> Configurações</button>
        </div>
    </div>
}