import { configureStore } from "@reduxjs/toolkit";
import { coursesApiSlice } from "../features/courses/courses-api-slice";
import { dogsApiSlice } from "../features/dogs/dogs-api-slice";
import authorSlice from "../features/courses/author-slice";

export const store = configureStore({
  reducer: {
    author: authorSlice, // creates an author field inside the state (state.author)
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
    [coursesApiSlice.reducerPath]: coursesApiSlice.reducer,
  }, // automatically does the combineReducers work behind the hood
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(dogsApiSlice.middleware)
      .concat(coursesApiSlice.middleware);
  },
});
