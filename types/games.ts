export interface IGamesListProps {
    filteredGames: IGamesMockData[];
    navigateTo: (path:string, game?: IGamesMockData | null) => void;
}

export interface IGameCardProps {
    game: IGamesMockData;
    navigateTo: (path:string, game?: IGamesMockData | null) => void;
}

export interface IGameDetailsProps {
    selectedGame: IGamesMockData;
    navigateTo: (path:string) => void;
    handleAddToCart: (game:IGamesMockData) => void;
}

export interface IGamesMockData {
  id: number;
  name: string;
  price: number;
  desc: string;
  genre: string;
  rating: number;
  class: string;
  img: string;
  specs: string[];
  comments: IComments[];
}

export interface IComments { user: string; text: string; }
