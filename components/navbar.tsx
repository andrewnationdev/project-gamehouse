import React from 'react';
import { ShoppingCart, Search, User, Gamepad2 } from 'lucide-react';
import { INavbarProps } from '../types/navbar';
import Link from 'next/link';

export default function NavbarComponent(props: INavbarProps) {
    return <nav className="bg-[#171a21] p-4 flex items-center justify-between sticky top-0 z-10 shadow-lg border-b border-[#2a475e]">
        <Link href="/"><h1
            className="text-xl flex gap-4 align-center font-bold cursor-pointer text-white hover:text-blue-400 transition"
            onClick={() => props.navigateTo('home')}>
            <Gamepad2 />
            {props.title}
        </h1>
        </Link>
        <div className="flex gap-4 items-center">
            <div className="relative">
                <Search className="absolute left-2 top-2 text-gray-400" size={18} />
                <input className="bg-[#2a475e] pl-8 p-1 rounded text-sm w-32 md:w-48 transition-all focus:w-64" placeholder="Buscar..." onChange={(e) => props.handleSearch(e.target.value)} />
            </div>
            <Link
                href="/user"
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