import { IFrontPageProps } from "../../types/screens";
import FiltersComponent from "../filters";
import GamesListComponent from "../ui/games_list";

export default function FrontPageComponent(props:IFrontPageProps) {
    return <main className="p-6">
        <FiltersComponent
            filter={props.filter}
            handleChangeFilter={props.handleChangeFilter}
        />
        <GamesListComponent
            filteredGames={props.filteredGames!}
        />
    </main>
}