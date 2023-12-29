import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import {
  useDeleteCourseMutation,
  useFetchCoursesQuery,
} from "../../features/courses/courses-api-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loadAuthors } from "../../features/courses/author-slice";
import Spinner from "../common/Spinner";
import CourseList from "./CourseList";

function CoursesPage() {
  const { authors = [], error } = useAppSelector((state) => state.author);
  const [deleteCourseOptimistic] = useDeleteCourseMutation();
  const { data: courses = [], isFetching } = useFetchCoursesQuery();

  const dispatch = useAppDispatch();
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState();

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(loadAuthors());
    }
  }, []);

  async function handleDeleteCourse(course) {

    try {
      await deleteCourseOptimistic(course.id);
      toast.success("Course deleted");
    } catch (error) {
      toast.error("Delete failed." + error.message, { autoClose: false });
    }
  }

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      {isFetching > 0 ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CourseList onDeleteClick={handleDeleteCourse} courses={courses} />
        </>
      )}
    </>
  );
}

export default CoursesPage;
