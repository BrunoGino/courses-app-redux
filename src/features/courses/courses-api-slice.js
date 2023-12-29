import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.API_URL;

export const coursesApiSlice = createApi({
  reducerPath: "courses-api",
  tagTypes: ["Courses"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCourses: builder.query({
      query() {
        return "/courses";
      },
      providesTags: (result) =>
        result.data
          ? [
              ...result.map(({ slug }) => ({ type: "Courses", slug })),
              "Courses",
            ]
          : ["Courses"],
    }),
    saveCourse: builder.mutation({
      query(body) {
        return {
          url: `/courses/${body.id ?? ""}`,
          method: body.id ? "PUT" : "POST",
          headers: {
            "content-type": "application/json",
          },
          body,
        };
      },
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
      query(id) {
        return {
          url: `/courses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useFetchCoursesQuery,
  useSaveCourseMutation,
  useDeleteCourseMutation,
} = coursesApiSlice;
