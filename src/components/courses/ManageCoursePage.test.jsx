import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { setupStore } from "../../features/store";
import ManageCoursePage from "./ManageCoursePage.jsx";


jest.mock("react-router-dom/cjs/react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue({
    slug: "course-slug",
  }),
}));

jest.mock("react-router-dom/cjs/react-router-dom.min", () => ({
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
describe("ManageCoursePage", () => {
  describe("Save Course", () => {
    it("Should handle save course", async () => {
      const user = userEvent.setup();
      fetchMock.mockIf("http://localhost:3001/courses", async () =>
        JSON.stringify([])
      );
      renderWithProviders(<ManageCoursePage />, {
        preloadedState: {
          author: {
            authors: [{ id: 1, name: "jimmy cliff" }],
            status: "succeeded",
          },
        },
      });

      const titleInput = await screen.findByLabelText("Title", {
        selector: "input",
      });
      await user.type(titleInput, "Top notch course");

      const authorInput = await screen.findByRole("combobox", {
        name: /author/i,
      });

      await user.selectOptions(authorInput, "jimmy cliff");

      const categoryInput = await screen.findByLabelText("Category", {
        selector: "input",
      });
      await user.type(categoryInput, "cool stuff");

      const submitButton = screen.getByRole("button", {
        name: /save/i,
      });
      await user.click(submitButton);

      expect(submitButton.textContent).toEqual("Saving...");
      expect(toast.success).toHaveBeenCalledWith("Course saved");      
    });
  });
});
