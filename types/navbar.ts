import { IGame } from "./games";

export interface INavbarProps {
    title: string;
    cart: IGame[];
    toggleCart: () => void;
    handleSearch: (value: string) => void;
}