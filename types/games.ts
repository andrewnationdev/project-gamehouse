export interface IGamesListProps {
    filteredGames: IGame[];
}

export interface IGameCardProps {
    game: IGame;
}

export interface IGameDetailsProps {
    selectedGame: IGame;
    navigateTo: (path:string) => void;
}

export interface ICart {
  handleAddToCart?: (game:IGame) => void;
}

export interface IGameComment {
  user: string;
  text: string;
}

export interface IGame extends ICart {
  id: number;
  name: string;
  price: number;
  genre: string;
  rating: number;
  background_image: string;
  description_raw: string;
  
  slug?: string;
  class?: string;
  specs?: string[];
  comments: IGameComment[];
  
  platforms?: Array<{
    platform: { name: string };
    requirements?: { minimum?: string; recommended?: string };
  }>;
}