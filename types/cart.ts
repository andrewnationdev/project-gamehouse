export interface ICartDrawerProps {
  cart: [];
  toggleCart: () => void;
  handleRemoveFromCart: (id: number) => void;
}