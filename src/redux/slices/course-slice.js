import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    createCourse(state, action) {
      state.courses = [...state.courses, action.payload];
    },
    updateCourse(state, action) {
      state.courses = state.courses.map((course) =>
        course.id === action.payload.id ? action.payload.id : course
      );
    },
    loadCourses(state, action) {
      state.courses = action.payload;
    },
    deleteCourseOptimistic(state, action) {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload.id
      );
    },
  },
});

export const {
  createCourse,
  deleteCourseOptimistic,
  loadCourses,
  updateCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
