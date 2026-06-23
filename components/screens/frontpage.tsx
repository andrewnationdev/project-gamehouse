import { IFrontPageProps } from "../../types/screens";
import FiltersComponent from "../filters";
import GamesListComponent from "../ui/games_list";
import StatusMessage from "../ui/status_message";

export default function FrontPageComponent(props: IFrontPageProps) {
    return <main className="p-6">
        <FiltersComponent
            filter={props.filter}
            handleChangeFilter={props.handleChangeFilter}
        />
        {props.isError ? (
            <StatusMessage
                type="error"
                message="ERRO DESCONHECIDO NO SERVIDOR. TENTE NOVAMENTE MAIS TARDE."
            />
        ) : props.filteredGames.length === 0 ? (
            <StatusMessage
                type="empty"
                message="NENHUM JOGO ENCONTRADO."
            />
        ) : (
            <>
                <GamesListComponent
                    filteredGames={props.filteredGames!}
                />
            </>)}
    </main>
}