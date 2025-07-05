import type { ColumnDef } from '@tanstack/react-table';
import type { IBorrowedSummary } from '@/types/borrow.type';

const borrowSummaryTableColumns: ColumnDef<IBorrowedSummary>[] = [
  {
    accessorKey: 'book.title',
    header: 'Book Title',
  },
  {
    accessorKey: 'book.isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Total Borrowed',
  },
];

export default borrowSummaryTableColumns;
