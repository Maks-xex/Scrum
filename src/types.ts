// export type bodyC = Record<string, Omit<ICardBody, "id">>;

export interface ICardBody {
  id: string;
  title: string;
  img?: string;
}

export interface ICard {
  id: string;
  title: string;
  body?: ICardBody[];
  order: number;
}
