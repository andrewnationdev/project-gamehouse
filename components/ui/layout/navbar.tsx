import React from 'react';
import { ShoppingCart, Search, User, Gamepad2 } from 'lucide-react';
import { INavbarProps } from '../../../types/navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavbarComponent(props: INavbarProps) {
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/`);
        }
    };

    return <nav className="bg-[#171a21] p-4 flex flex-col md:flex-row md:gap-8 items-center justify-between sticky top-0 z-10 shadow-lg border-b border-[#2a475e]">
        <Link href="/"><h1
            className="text-xl flex gap-4 align-center font-bold cursor-pointer text-white hover:text-blue-400 transition"
        ><Gamepad2 />
            {props.title}
        </h1>
        </Link>
        <div className="flex gap-4 items-center">
            <div className="relative flex items-center">
                <Search className="absolute left-2 text-gray-400" size={18} />
                <input 
                className="bg-[#2a475e] focus:bg-[#315d80] focus:outline-none pl-8 p-1 rounded text-sm w-52 transition-all" 
                placeholder="Digite aqui para buscar..." 
                onChange={(e) => props.handleSearch(e.target.value)} 
                onKeyDown={handleKeyDown}
                />
            </div>
            <Link
                href="/user/amazing_235"
                className="cursor-pointer hover:text-blue-400 transition">
                <User size={30} />
            </Link>
            <button
                onClick={props.toggleCart}
                className="cursor-pointer relative transition hover:scale-110">
                <ShoppingCart size={30} />
                {props.cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold text-white">
                    {props.cart.length}
                </span>
                }
            </button>
        </div>
    </nav>
}