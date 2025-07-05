import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import type { IUserPath } from "@/types/router.type";

export const publicPaths: IUserPath[] = [
  {
    path: "",
    element: <Books />,
  },
  {
    name: "All Books",
    path: "books",
    element: <Books />,
  },
  {
    name: "Add Book",
    path: "create-book",
    element: <CreateBook />,
  },
  {
    path: "books/:id",
    element: <BookDetails />,
  },
  {
    path: "edit-book/:id",
    element: <EditBook />,
  },
  {
    path: "borrow/:bookId",
    element: <BorrowBook />,
  },
  {
    name: "Borrow Summary",
    path: "borrow-summary",
    element: <BorrowSummary />,
  },
];
