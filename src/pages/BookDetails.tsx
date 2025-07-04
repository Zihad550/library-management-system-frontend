import {
  useDeleteBookByIdMutation,
  useGetBookByIdQuery,
} from "@/redux/features/book/book.api";
import { useParams } from "react-router";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";
import Spinner from "@/components/shared/Spinner";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import DeleteBookConfirmationDialog from "@/components/module/books/DeleteBookConfirmationDialog";
import { BookGenreMap } from "@/constants/book.constants";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(id as string);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookByIdMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!data?.data) return;
    const toastId = toast.loading("Deleting book...");
    try {
      const res = await deleteBook(data.data._id).unwrap();
      if (res.success) {
        toast.success("Book deleted successfully", { id: toastId });
        navigate("/books");
      }
    } catch (err) {
      toast.error("Failed to delete book", { id: toastId });
    }
  };

  if (isLoading || isDeleting) return <Spinner />;
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

      <Card className="p-0 overflow-hidden flex flex-row">
        <div className="md:w-1/3">
          <img
            src={
              book.coverImgUrl ||
              "https://via.placeholder.com/350x500?text=No+Cover+Available"
            }
            alt={book.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/350x500?text=No+Cover+Available";
            }}
          />
        </div>

        <div className="md:w-2/3 p-4">
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
                <DeleteBookConfirmationDialog handleDelete={handleDelete} />
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
