export interface INavbarProps {
    title: string;
    navigateTo: (newView: any, game?: null) => void;
    cart: [];
    toggleCart: () => void;
    handleSearch: (value: string) => void;
}