import { IFiltersProps } from "../../../types/genres";
import { getGenres } from "../../../utils/genres";

export default function FiltersComponent(props:IFiltersProps) {
    return <div className="flex gap-2 mb-6 flex-wrap overflow-x-auto pb-2">
        {getGenres().map(f => (
            <button 
            key={f} 
            onClick={() => props.handleChangeFilter(f)} 
            className={`cursor-pointer px-4 py-1 rounded-full transition ${props.filter === f ? 'bg-[#66c0f4] text-black' : 'bg-[#2a475e] hover:bg-[#3d688a]'}`}
            >
                {f}
            </button>
        ))}
    </div>
}