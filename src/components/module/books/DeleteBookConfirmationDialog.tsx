import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookByIdMutation } from "@/redux/features/book/book.api";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const DeleteBookDialog = ({ id, label }: { id: string; label?: string }) => {
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookByIdMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting book...");
    try {
      const res = await deleteBook(id).unwrap();
      if (res.success) {
        toast.success("Book deleted successfully", { id: toastId });
        navigate("/books");
      }
    } catch (err) {
      toast.error("Failed to delete book", { id: toastId });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {label ? (
          <Button
            variant="ghost"
            className="hover:cursor-pointer text-red-400 hover:bg-red-100 hover:text-red-500 w-full flex justify-start"
            size="sm"
          >
            {label}
          </Button>
        ) : (
          <Button
            size="icon"
            variant="destructive"
            className="h-10 w-10 rounded-full hover:cursor-pointer"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookDialog;
