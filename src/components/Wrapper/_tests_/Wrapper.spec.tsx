import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Wrapper } from "../Wrapper";
import { Provider } from "react-redux";
import {store} from "../../../api/store";
import { DarkModeProvider } from "../../../context/index";
import {mockResult} from "../../../utils/mocks"
import {configureStore} from "@reduxjs/toolkit";
import {peopleApi} from "../../../api/peopleSlice/peopleSlice";


// mock 10 results
const mockResults = new Array(10).fill(mockResult);

const renderWithProviders = (ui: JSX.Element, { reduxState } = { reduxState: {} }) => {
  const store = configureStore({
    reducer: {
      [peopleApi.reducerPath]: peopleApi.reducer,
    },
    preloadedState: reduxState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(peopleApi.middleware),
  });

  return render(<Provider store={store}><DarkModeProvider>{ui}</DarkModeProvider></Provider>);
};

describe("Wrapper", () => {
  test("Fetches results and updates URL", async () => {
    const getPageParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const search = searchParams.get("search");
      const page = searchParams.get("page");
      return [search, page];
    };

    const preloadedState = {
      selected: {
        items: mockResults,
      },
    };

    renderWithProviders(<BrowserRouter><Wrapper /></BrowserRouter>, { reduxState: preloadedState });


    const searchInput = screen.getByRole("textbox", { name: /searchInput/i });
    fireEvent.change(searchInput, { target: { value: "anakin" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    await waitFor(() => {
      const nextPaginator = screen.getByText("NextPage");
      fireEvent.click(nextPaginator);

      const [search, page] = getPageParams();
      expect(search).toEqual("anakin");
      expect(page).toEqual(null);
    });
  });

  test("Checks Loading Indicator", async () => {
    const preloadedState = {
      selected: {
        items: mockResults,
      },
    };

    renderWithProviders(<BrowserRouter><Wrapper /></BrowserRouter>, { reduxState: preloadedState });
    const searchInput = screen.getByRole("textbox", { name: /searchInput/i });
    fireEvent.change(searchInput, { target: { value: "an" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    const loadingIndicator = screen.getByText("Loading...");

    expect(loadingIndicator).toBeInTheDocument();
  });
});
