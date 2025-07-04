import type { IUserPath } from "@/types/router.type";
import Books from "@/pages/Books";
import CreateBook from "@/pages/CreateBook";
import BookDetails from "@/pages/BookDetails";
import EditBook from "@/pages/EditBook";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";

export const publicPaths: IUserPath[] = [
  {
    path: "",
    element: <Books />,
  },
  {
    name: "Books",
    path: "books",
    element: <Books />,
  },
  {
    name: "Create Book",
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
