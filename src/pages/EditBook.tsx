import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod/v4";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppSelect from "@/components/form/AppSelect";
import AppTextarea from "@/components/form/AppTextarea";
import Spinner from "@/components/shared/Spinner";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { BookGenreMap } from "@/constants/book.constants";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/book.api";
import type IBook from "@/types/book.type";
import type { FieldValues } from "react-hook-form";

const genreOptions = Object.entries(BookGenreMap).map(([key, value]) => ({
  value: key,
  label: value,
}));

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum(Object.keys(BookGenreMap)),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.coerce.number().min(0, "Copies cannot be negative").default(1),
  available: z.boolean().default(true),
});

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading: isBookLoading } = useGetBookByIdQuery(
    id as string,
  );
  const [updateBook, { isLoading: isUpdateLoading }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const defaultValues = {
    title: bookData?.data?.title ?? "",
    author: bookData?.data?.author ?? "",
    isbn: bookData?.data?.isbn ?? "",
    description: bookData?.data?.description ?? "",
    copies: bookData?.data?.copies ?? 1,
    available: bookData?.data?.available ?? true,
    genre: bookData?.data?.genre ?? "FICTION",
  };

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Updating book...");
    try {
      const res = await updateBook({
        payload: values as Partial<IBook>,
        id: id as string,
      }).unwrap();

      if (res?.success) {
        toast.success("Book updated successfully!", { id: toastId });
        navigate(`/books/${id}`);
      }
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      toast.error("Failed to update book. Please try again.", { id: toastId });
    }
  };

  if (isBookLoading) return <Spinner />;

  if (!bookData?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <div className="text-5xl text-red-500/80">📚</div>
            <p className="text-xl text-gray-600">Book not found</p>
            <Button asChild variant="outline">
              <NavLink to="/books">Back to Books</NavLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title>Edit Book</Title>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardDescription>Update the book information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <AppForm
            key={bookData.data._id}
            onSubmit={onSubmit}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultValues}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppInput name="title" label="Book Title" />
              <AppInput name="author" label="Author" />
              <AppInput name="isbn" label="ISBN" type="string" />
              <AppSelect
                name="genre"
                label="Genre"
                items={genreOptions}
                placeholder="Select a genre"
              />
              <AppInput name="copies" label="Number of Copies" type="number" />
              <div className="md:col-span-2">
                <AppTextarea
                  name="description"
                  label="Description"
                  placeholder="A brief description of the book..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isUpdateLoading}
                className="w-full md:w-auto"
              >
                {isUpdateLoading ? "Updating..." : "Update Book"}
              </Button>
            </div>
          </AppForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBook;
