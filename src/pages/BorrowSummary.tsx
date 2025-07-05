import BorrowSummaryTable from "@/components/module/borrow/BorrowSummaryTable";
import borrowSummaryTableColumns from "@/components/module/borrow/BorrowSummaryTableColumns";
import Spinner from "@/components/shared/Spinner";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBorrowedBookSummaryQuery } from "@/redux/features/book/borrow.api";
import { NavLink } from "react-router";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useBorrowedBookSummaryQuery(undefined);

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <div className="text-5xl text-red-500/80">⚠️</div>
            <p className="text-xl text-gray-600">Something went wrong</p>
            <Button asChild variant="outline">
              <NavLink to="/books">Go to Books</NavLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const borrowedBooks = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title>Borrowed Books</Title>
      <Card className="p-6">
        <BorrowSummaryTable
          columns={borrowSummaryTableColumns}
          data={borrowedBooks}
        />
      </Card>
    </div>
  );
};

export default BorrowSummary;
