import { act, renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { Provider } from "react-redux";
import coursesReducer, {
  useSaveCourseMutation,
} from "./courses/courses-api-slice";
import { store } from "./store";

function wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("Store", () => {
  process.env = {
    API_URL: "http://localhost:3001",
  };
  fetchMock.mockOnceIf(`http://localhost:3001/courses/1`, () =>
    Promise.resolve({
      status: 200,
    })
  );

  it("Should handle creating courses", async () => {
    const {
      result: { current },
    } = renderHook(() => useSaveCourseMutation(), { wrapper });

    const [saveCourse] = current;
    await act(async () => {
      await saveCourse({
        id: 1,
        title: "test title",
        authorId: 2,
        category: "cool stuff",
      });
    });
    console.log(JSON.stringify(current[1]))
    await waitFor(() => expect(current[1].isSuccess).toBe(true));

    const course = {
      title: "Clean Code",
    };
    console.log(JSON.stringify(current));
    const createdCourse = store.getState().courses[0];

    expect(createdCourse).toEqual(course);
  });
});
