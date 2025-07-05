import DeleteBookDialog from "@/components/module/books/DeleteBookConfirmationDialog";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookGenreMap } from "@/constants/book.constants";
import { useGetBookByIdQuery } from "@/redux/features/book/book.api";
import { ArrowLeft, Edit } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(id as string);
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  else if (!data?.data)
    return (
      <div className="container mx-auto mt-10 p-4 text-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg text-red-600">Book data not found</p>
            <Button asChild variant="outline" className="mt-4">
              <NavLink to="/books">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Books
              </NavLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  const book = data.data;

  return (
    <div className="container mx-auto mt-10 p-4">
      <Button asChild variant="outline" className="mb-6">
        <NavLink to="/books" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
        </NavLink>
      </Button>

      <Card className="overflow-hidden">
        <div className="p-4">
          <CardHeader className="p-0">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">{book.title}</CardTitle>
                <CardDescription className="text-xl mb-4">
                  by {book.author}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="default"
                  className="h-10 w-10 rounded-full hover:cursor-pointer"
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <DeleteBookDialog id={book._id} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                {BookGenreMap[book.genre]}
              </span>
              {book.available ? (
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                  Available
                </span>
              ) : (
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-100 text-red-800">
                  Unavailable
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h2 className="text-lg font-semibold">Details</h2>
                <ul className="mt-2 space-y-2">
                  <li className="text-gray-600">
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </li>
                  <li className="text-gray-600">
                    <span className="font-medium">Copies:</span> {book.copies}
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="mt-2 text-gray-600">{book.description}</p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default BookDetails;
