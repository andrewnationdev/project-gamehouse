import { IGamesMockData } from "./games";
import { TGenres } from "./genres";

export type TNavigation = (path:string, game?: IGamesMockData | null) => void;

export interface IFrontPageProps {
    filter: TGenres;
    handleChangeFilter: (value: string) => void;
    filteredGames: IGamesMockData[];
    navigateTo: TNavigation;
}