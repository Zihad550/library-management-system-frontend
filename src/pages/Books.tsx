import BooksTable from "@/components/module/books/BooksTable";
import bookTableColumns from "@/components/module/books/BookTableColumns";
import Spinner from "@/components/shared/Spinner";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetBooksQuery } from "@/redux/features/book/book.api";
import { PlusCircle } from "lucide-react";
import { NavLink } from "react-router";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Title>Library Books</Title>
        <Button asChild>
          <NavLink to="/create-book" className="flex items-center gap-2">
            <PlusCircle size={20} /> Add New Book
          </NavLink>
        </Button>
      </div>
      <Card className="p-6">
        {!data?.data ? (
          <p className="text-center text-gray-500">No books available</p>
        ) : (
          <BooksTable columns={bookTableColumns} data={data.data} />
        )}
      </Card>
    </div>
  );
};

export default Books;
