import { IGame } from "./games";

export interface ICartDrawerProps {
  cart: IGame[];
  toggleCart: () => void;
  handleRemoveFromCart: (id: number) => void;
}