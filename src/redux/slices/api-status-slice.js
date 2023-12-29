import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiCallsInProgress: 0,
};

const apiStatusSlice = createSlice({
  name: "api-status",
  initialState,
  reducers: {
    beginApiCall(state) {
      state.apiCallsInProgress++;
    },
    endApiCall(state) {
      state.apiCallsInProgress--;
    },
  },
});

export const { beginApiCall, endApiCall } = apiStatusSlice.actions;
export default apiStatusSlice.reducer;
