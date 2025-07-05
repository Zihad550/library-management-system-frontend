import type IBook from "./book.type";

export default interface IBorrow {
  book: string | IBook;
  quantity: number;
  dueDate: Date;
}

export interface ICreateBorrow extends IBorrow {
  book: string;
}

export interface IBorrowedSummary {
  book: { title: string; isbn: string };
  totalQuantity: number;
}
