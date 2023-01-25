export interface ICardBody {
  id: string;
  title: string;
  img?: string;
  order: number;
}

export interface ICard {
  id: string;
  title: string;
  body?: ICardBody[];
  order: number;
}
