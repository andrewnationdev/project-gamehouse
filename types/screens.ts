import { IGame } from "./games";
import { TGenres } from "./genres";

export interface IFrontPageProps {
    filter: TGenres;
    handleChangeFilter: (value: string) => void;
    filteredGames: IGame[];
    isError: boolean;
}

export interface IStatus {
  type: 'error' | 'empty';
  message: string;
}