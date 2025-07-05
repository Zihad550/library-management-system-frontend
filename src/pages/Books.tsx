import BooksTable from "@/components/module/books/BooksTable";
import bookTableColumns from "@/components/module/books/BookTableColumns";
import Title from "@/components/shared/Title";
import { useGetBooksQuery } from "@/redux/features/book/book.api";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>No books available</p>;

  return (
    <div className="container mx-auto">
      <Title>Books</Title>
      <BooksTable columns={bookTableColumns} data={data.data} />
    </div>
  );
};

export default Books;
