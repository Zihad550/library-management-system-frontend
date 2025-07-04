export default interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: TBookGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  coverImgUrl: string;
}

export type TBookGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";
