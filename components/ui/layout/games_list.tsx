import { IGamesListProps } from "../../../types/games";
import GameCardComponent from "../elements/game_card";

export default function GamesListComponent(props: IGamesListProps) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-500">
        {props.filteredGames.map(game => (
            <GameCardComponent
                key={game.id}
                game={game}
            />
        ))}
    </div>
}