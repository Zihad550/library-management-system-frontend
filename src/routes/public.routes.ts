import App from "@/App";
import type { IUserPath } from "@/types/router.type";

export const publicPaths: IUserPath[] = [
  {
    name: "Books",
    path: "books",
    Component: App,
  },
  {
    name: "Create Book",
    path: "create-book",
    Component: App,
  },
  {
    path: "books/:id",
    Component: App,
  },
  {
    path: "edit-book/:id",
    Component: App,
  },
  {
    path: "borrow/:bookId",
    Component: App,
  },
  {
    name: "Borrow Summary",
    path: "borrow-summary",
    Component: App,
  },
];
