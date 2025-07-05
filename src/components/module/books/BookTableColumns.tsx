import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type IBook from "@/types/book.type";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router";
import DeleteBookDialog from "./DeleteBookConfirmationDialog";

const bookTableColumns: ColumnDef<IBook>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "copies",
    header: "Copies",
  },
  {
    accessorKey: "available",
    header: "Availability",
    cell: ({ row }) => {
      const available = row.getValue("available");
      return <span>{available ? "Available" : "Unavailable"}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <NavLink to={`/edit-book/${book._id}`}>Edit Book</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink to={`/borrow/${book._id}`}>Borrow Book</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteBookDialog label="Delete Book" id={book._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default bookTableColumns;
