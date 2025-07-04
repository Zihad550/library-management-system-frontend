import type { IUserPath } from "@/types/router.type";
import Books from "@/pages/Books";

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
    element: <Books />,
  },
  {
    path: "books/:id",
    element: <Books />,
  },
  {
    path: "edit-book/:id",
    element: <Books />,
  },
  {
    path: "borrow/:bookId",
    element: <Books />,
  },
  {
    name: "Borrow Summary",
    path: "borrow-summary",
    element: <Books />,
  },
];
