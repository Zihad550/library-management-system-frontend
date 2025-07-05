import { baseApi } from "@/redux/api/baseApi";
import type { ICreateBorrow, IResponseRedux } from "@/types";
import type IBook from "@/types/book.type";
import type IBorrow from "@/types/borrow.type";
import generateUrlParams from "@/utils/generateUrlParams";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    borrowedBookSummary: build.query<
      IResponseRedux<IBook[]>,
      Record<string, unknown> | undefined
    >({
      query: (args) => ({
        url: "/borrow",
        params: generateUrlParams(args),
      }),
      providesTags: ["borrows"],
    }),
    borrowBook: build.mutation<IResponseRedux<IBorrow>, ICreateBorrow>({
      query: (payload) => ({
        method: "POST",
        url: "/borrow",
        body: payload,
      }),
      invalidatesTags: ["borrows"],
    }),
  }),
});

export const { useBorrowedBookSummaryQuery, useBorrowBookMutation } = bookApi;
