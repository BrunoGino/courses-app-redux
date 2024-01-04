import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { newCourse } from "../../../tools/mockData";
import { loadAuthors } from "../../features/courses/author-slice";
import {
  useFetchCoursesQuery,
  useSaveCourseMutation,
} from "../../features/courses/courses-api-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Spinner from "../common/Spinner";
import CourseForm from "./CourseForm";

function ManageCoursePage() {
  const dispatch = useAppDispatch();
  const { authors, status: authorsFetchStatus } = useAppSelector(
    (state) => state.author
  );
  const { slug } = useParams();
  const history = useHistory();
  const { initialCourse, isFetchingCourses } = useFetchCoursesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      initialCourse: data?.find((course) => course.slug === slug),
      isFetchingCourses: isFetching,
    }),
  });
  const [saveCourse, { isLoading: isSaving }] = useSaveCourseMutation();
  const [course, setCourse] = useState(newCourse);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(loadAuthors());
    }
    if (initialCourse) {
      setCourse(initialCourse);
    }
  }, [initialCourse]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";
    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    try {
      await saveCourse(course);
      toast.success("Course saved");
      history.push("/courses");
    } catch (error) {
      setErrors({ onSave: error.message });
    }
  }

  return isFetchingCourses || authorsFetchStatus === "loading" ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={isSaving}
    />
  );
}

export default ManageCoursePage;
