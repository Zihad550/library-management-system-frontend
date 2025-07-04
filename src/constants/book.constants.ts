import type { TBookGenre } from "@/types";

export const BookGenreMap: Record<TBookGenre, string> = {
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
  FICTION: "Fiction",
  HISTORY: "History",
  NON_FICTION: "Non Fiction",
  SCIENCE: "Science",
} as const;
