import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import AppDatePicker from "@/components/form/AppDatePicker";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBookByIdQuery } from "@/redux/features/book/book.api";
import { useBorrowBookMutation } from "@/redux/features/book/borrow.api";
import type { ICreateBorrow } from "@/types";
import { useMemo } from "react";
import type { FieldValues } from "react-hook-form";

const BorrowBook = () => {
  const { bookId } = useParams();
  console.log(bookId);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const { data: bookData, isLoading: isLoadingBooks } = useGetBookByIdQuery(
    bookId as string,
  );

  const formSchema = useMemo(() => {
    const maxQuantity = bookData?.data?.copies ? bookData?.data.copies : 0; // Default to 1 or some sensible minimum
    return z.object({
      quantity: z.coerce
        .number()
        .min(1, "Quantity must be at least 1")
        .max(
          maxQuantity,
          `Quantity cannot exceed ${maxQuantity} (available copies)`,
        ),
      dueDate: z.date().min(new Date(), "Due date must be in the future"),
    });
  }, [bookData?.data?.copies]);

  const navigate = useNavigate();

  const defaultValues = {
    quantity: 1,
    dueDate: new Date(),
  };

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Borrowing book...");
    try {
      const res = await borrowBook({
        ...values,
        book: bookData?.data?._id,
      } as ICreateBorrow).unwrap();
      if (res?.success) {
        toast.success("Book borrowed successfully!", { id: toastId });
        navigate("/borrow-summary");
      }
    } catch (error) {
      console.error("Failed to borrow book:", error);
      toast.error("Failed to borrow book. Please try again.", { id: toastId });
    }
  };

  if (isLoadingBooks) return <Spinner />;
  if (!bookData || !bookData.data?.copies)
    return (
      <Card className="text-center">
        <h2 className="text-4xl">No copies available</h2>
      </Card>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Borrow a Book</CardTitle>
          <CardDescription>
            Fill out the form below to borrow a book from the library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Title:</span>
              <span className="text-lg font-semibold">
                {bookData?.data?.title}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Author:</span>
              <span className="text-lg font-semibold">
                {bookData?.data?.author}
              </span>
            </div>
          </div>

          <AppForm
            onSubmit={onSubmit}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultValues}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <AppInput name="quantity" label="Quantity" type="number" />
              <AppDatePicker
                name="dueDate"
                label="Due Date"
                disabledDate={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
              />
            </div>
            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isLoading || isLoadingBooks}
                className="w-full md:w-auto"
              >
                {isLoading ? "Borrowing..." : "Borrow Book"}
              </Button>
            </div>
          </AppForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowBook;
