import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import AppDatePicker from "@/components/form/AppDatePicker";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import Spinner from "@/components/shared/Spinner";
import Title from "@/components/shared/Title";
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
import { ArrowLeft, BookOpen } from "lucide-react";
import { useMemo } from "react";
import type { FieldValues } from "react-hook-form";

const BorrowBook = () => {
  const { bookId } = useParams();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const { data: bookData, isLoading: isLoadingBooks } = useGetBookByIdQuery(
    bookId as string,
  );
  const navigate = useNavigate();

  const formSchema = useMemo(() => {
    const maxQuantity = bookData?.data?.copies ? bookData?.data.copies : 0;
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
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      toast.error("Failed to borrow book. Please try again.", { id: toastId });
    }
  };

  if (isLoadingBooks) return <Spinner />;

  if (!bookData || !bookData.data?.copies) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <div className="text-5xl text-yellow-500/80">
              <BookOpen />
            </div>
            <p className="text-xl text-gray-600">No copies available</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Title>Borrow a Book</Title>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl">{bookData.data.title}</CardTitle>
            <CardDescription>by {bookData.data.author}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <AppForm
            onSubmit={onSubmit}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultValues}
          >
            <div className="space-y-6">
              <AppInput
                name="quantity"
                label="Quantity"
                type="number"
                description={`Max available: ${bookData.data.copies}`}
              />
              <AppDatePicker
                name="dueDate"
                label="Due Date"
                disabledDate={(date) => date < new Date()}
              />
              <div className="pt-4">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Processing..." : "Borrow Book"}
                </Button>
              </div>
            </div>
          </AppForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowBook;
