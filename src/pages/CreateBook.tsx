import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod/v4";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppSelect from "@/components/form/AppSelect";
import AppTextarea from "@/components/form/AppTextarea";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { BookGenreMap } from "@/constants/book.constants";
import { useCreateBookMutation } from "@/redux/features/book/book.api";
import type IBook from "@/types/book.type";
import type { FieldValues } from "react-hook-form";

const genreOptions = Object.entries(BookGenreMap).map(([key, value]) => ({
  value: key,
  label: value,
}));

const CreateBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.enum(Object.keys(BookGenreMap)),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.coerce.number().min(0, "Copies cannot be negative").default(1),
    available: z.boolean().default(true),
  });

  const defaultValues = {
    title: "",
    author: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
    genre: "FICTION",
  };

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Creating book...");
    try {
      const res = await createBook(values as IBook).unwrap();
      if (res?.success) {
        toast.success("Book created successfully!", { id: toastId });
        navigate("/books");
      }
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else
        toast.error("Failed to create book. Please try again.", {
          id: toastId,
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Title>Add New Book</Title>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardDescription>
            Fill in the book details below to add it to the library.
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
