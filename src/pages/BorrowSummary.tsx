import Spinner from '@/components/shared/Spinner';
import BorrowSummaryTable from '@/components/module/borrow/BorrowSummaryTable';
import borrowSummaryTableColumns from '@/components/module/borrow/BorrowSummaryTableColumns';
import { useBorrowedBookSummaryQuery } from '@/redux/features/book/borrow.api';

const BorrowSummary = () => {
  const { data, isLoading, isError } = useBorrowedBookSummaryQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  const borrowedBooks = data?.data || [];
  return (
    <div className="page-container">
      <BorrowSummaryTable
        columns={borrowSummaryTableColumns}
        data={borrowedBooks}
      />
    </div>
  );
};

export default BorrowSummary;
