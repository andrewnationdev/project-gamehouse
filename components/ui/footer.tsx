export default function FooterComponent(){
    return <footer className="bg-[#171a21] p-6 mt-10 border-t border-[#2a475e] text-gray-400">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-bold text-white">Project GameHouse</p>
                    <p className="text-xs">Desenvolvido por AndrewNation</p>
                </div>
                
                <div className="flex gap-6 text-sm">
                    <a href="https://github.com/seu-usuario/seu-repositorio" target="_blank" className="hover:text-blue-400 transition">Repositório</a>
                    <a href="https://rawg.io/apidocs" target="_blank" className="hover:text-blue-400 transition">RAWG.io</a>
                    <a href="#" className="hover:text-blue-400 transition">Mais Projetos</a>
                </div>

                <div className="text-xs">
                    © {new Date().getFullYear()} - Todos os direitos reservados.
                </div>
            </div>
        </footer>
}