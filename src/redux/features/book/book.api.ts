import { baseApi } from "@/redux/api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
