import type IBook from "./book.type";

export default interface IBorrow {
  book: string | IBook;
  quantity: number;
  dueDate: Date;
}

export interface ICreateBorrow extends IBorrow {
  book: string;
}
