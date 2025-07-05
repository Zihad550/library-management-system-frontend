import DeleteBookDialog from "@/components/module/books/DeleteBookConfirmationDialog";
import Spinner from "@/components/shared/Spinner";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <div className="text-5xl text-red-500/80">📚</div>
            <p className="text-xl text-gray-600">Book not found</p>
            <Button asChild variant="outline">
              <NavLink to="/books" className="flex items-center gap-2">
                <ArrowLeft size={18} /> Back to Books
              </NavLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline" size="sm">
          <NavLink to="/books" className="flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </NavLink>
        </Button>
        <Title>{book.title}</Title>
      </div>

      <Card className="max-w-4xl mx-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <CardTitle className="text-3xl mb-2">{book.title}</CardTitle>
              <CardDescription className="text-xl">
                by {book.author}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full hover:bg-primary/10"
                onClick={() => navigate(`/edit-book/${book._id}`)}
              >
                <Edit className="h-5 w-5" />
              </Button>
              <DeleteBookDialog id={book._id} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {BookGenreMap[book.genre]}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                book.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.available ? "Available" : "Unavailable"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-500">ISBN:</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-500">Copies:</dt>
                  <dd>{book.copies}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 text-sm">{book.description}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetails;
