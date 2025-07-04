import BookCard from "@/components/module/books/BookCard";
import Title from "@/components/shared/Title";
import { useGetBooksQuery } from "@/redux/features/book/book.api";

const Books = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>No books available</p>;

  return (
    <div className="container mx-auto">
      <Title>Books</Title>
      <div className="grid grid-cols-4 justify-items-center gap-4 max-w-5xl mx-auto bg-accent p-5 rounded-xl">
        {data?.data.map((book) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
};

export default Books;
