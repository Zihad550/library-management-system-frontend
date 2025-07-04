import type IBook from "@/types/book.type";
import { useNavigate } from "react-router";

const BookCard = ({ book }: { book: IBook }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group h-[320px] w-52 hover:cursor-pointer shadow-sm  hover:shadow-lg rounded-xl"
      onClick={() => navigate(`/books/${book._id}`)}
    >
      <img
        src={book.coverImgUrl}
        className="h-60 w-52 rounded-t-sm group-hover:grayscale"
      />
      <div className="p-2 ">
        <h5 className="text-center text-gray-500">{book.author}</h5>
        <h4 className=" text-center">{book.title}</h4>
      </div>
    </div>
  );
};

export default BookCard;
