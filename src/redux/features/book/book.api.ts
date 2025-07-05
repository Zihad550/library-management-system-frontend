import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux } from "@/types";
import type IBook from "@/types/book.type";
import generateUrlParams from "@/utils/generateUrlParams";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query<
      IResponseRedux<IBook[]>,
      Record<string, unknown> | undefined
    >({
      query: (args = undefined) => ({
        url: "/books",
        params: generateUrlParams(args),
      }),
      providesTags: ["books"],
    }),
    getBookById: build.query<IResponseRedux<IBook>, string>({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ["books"],
    }),
    updateBook: build.mutation<
      IResponseRedux<IBook>,
      { payload: Partial<IBook>; id: string }
    >({
      query: ({ payload, id }) => ({
        method: "PUT",
        url: `/books/${id}`,
        body: payload,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBookById: build.mutation<IResponseRedux<IBook>, string>({
      query: (id) => ({
        method: "DELETE",
        url: `/books/${id}`,
      }),
      invalidatesTags: ["books", "borrows"],
    }),
    createBook: build.mutation<IResponseRedux<IBook>, IBook>({
      query: (payload) => ({
        method: "POST",
        url: "/books",
        body: payload,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookByIdMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} = bookApi;
