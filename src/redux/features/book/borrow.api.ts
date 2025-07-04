import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux } from "@/types";
import type IBook from "@/types/book.type";
import generateUrlParams from "@/utils/generateUrlParams";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    borrowedBookSummary: build.query<
      IResponseRedux<IBook[]>,
      Record<string, unknown> | undefined
    >({
      query: (args) => ({
        url: "/borrows",
        params: generateUrlParams(args),
      }),
      providesTags: ["borrows"],
    }),
    borrowBook: build.mutation({
      query: () => ({
        method: "POST",
        url: "/borrows",
      }),
      invalidatesTags: ["borrows"],
    }),
  }),
});

export const { useBorrowedBookSummaryQuery, useBorrowBookMutation } = bookApi;
