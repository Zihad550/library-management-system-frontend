import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod/v4";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppSelect from "@/components/form/AppSelect";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookGenreMap } from "@/constants/book.constants";
import { useCreateBookMutation } from "@/redux/features/book/book.api";
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
  isbn: z
    .string()
    .min(10, "ISBN must be at least 10 characters")
    .max(13, "ISBN must be at most 13 characters"),
  description: z.string().optional(),
  copies: z.coerce.number().min(0, "Copies cannot be negative").default(1),
  available: z.boolean().default(true),
});

type TFormValues = z.infer<typeof formSchema>;

const CreateBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const defaultValues: Partial<TFormValues> = {
    title: "",
    author: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
    genre: "FICTION",
  };

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    const toastId = toast.loading("Creating book...");
    try {
      // The API mutation needs to be updated to accept a payload
      const res = await createBook(values as IBook).unwrap();
      if (res?.success) {
        toast.success("Book created successfully!", { id: toastId });
        navigate("/books");
      }
    } catch {
      toast.error("Failed to create book. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Book</CardTitle>
          <CardDescription>
            Fill out the form below to add a new book to the library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppForm
            onSubmit={onSubmit}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultValues}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppInput name="title" label="Book Title" />
              <AppInput name="author" label="Author" />
              <AppInput name="isbn" label="ISBN" type="number" />

              <AppSelect
                name="genre"
                label="Genre"
                items={genreOptions}
                placeholder="Select a genre"
              />

              <AppInput name="copies" label="Number of Copies" />

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
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                {isLoading ? "Creating..." : "Create Book"}
              </Button>
            </div>
          </AppForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBook;
