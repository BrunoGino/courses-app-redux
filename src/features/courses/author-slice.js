import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authorApi from "../../api/authorApi";

const initialState = {
  authors: [],
  status: "uninitialized",
  error: null,
};

export const loadAuthors = createAsyncThunk("author/fetchAuthors", async () => {
  const authors = await authorApi.getAuthors();
  return authors;
});

// creates the action creator for each of the different functions declared in "reducers"
const authorSlice = createSlice({
  name: "author",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAuthors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authors = action.payload;
      })
      .addCase(loadAuthors.rejected, (state, action) => {
        state.status = "failed";
        state.authors = action.payload;
        state.error = action.error;
      });
  },
});

export default authorSlice.reducer;
