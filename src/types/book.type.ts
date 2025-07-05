export default interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: TBookGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export type TBookGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";
