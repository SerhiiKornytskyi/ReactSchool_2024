import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Flyout } from "../Flyout";
import markedItemsReducer from "../../../api/markedItemsSlice/markedItemsSlice";
import ObjectToCSV from "../../../utils/objectToCsv";
import {mockResult} from "../../../utils/mocks"
import {SearchResult} from "../../../utils/types";


// mock 3 results
const mockResults = new Array(3).fill(mockResult);

// Mock ObjectToCSV component
jest.mock("../../../utils/objectToCsv", () => ({ data, fileName }: {data: SearchResult[], fileName:string}) => (
    <div data-testid="ObjectToCSV"></div>
));

const renderWithProviders = (ui: JSX.Element, { reduxState } = { reduxState: {} }) => {
    const store = configureStore({
        reducer: {
            selected: markedItemsReducer,
        },
        preloadedState: reduxState,
    });

    return render(<Provider store={store}>{ui}</Provider>);
};

describe("Flyout", () => {
    test("renders the correct number of selected items", () => {
        const preloadedState = {
            selected: {
                items: mockResults,
            },
        };

        renderWithProviders(<Flyout />, { reduxState: preloadedState });

        expect(screen.getByText("3 items are selected")).toBeInTheDocument();
    });

    test("dispatches removeAll action when 'Unselect All' button is clicked", () => {
        const preloadedState = {
            selected: {
                items: mockResults,
            },
        };

        const store = configureStore({
            reducer: {
                selected: markedItemsReducer,
            },
            preloadedState,
        });

        render(
            <Provider store={store}>
                <Flyout />
            </Provider>
        );

        fireEvent.click(screen.getByText("Unselect All"));

        expect(store.getState().selected.items).toHaveLength(0);
    });

    test("renders correctly when no items are selected", () => {
        const preloadedState = {
            selected: {
                items: [],
            },
        };

        renderWithProviders(<Flyout />, { reduxState: preloadedState });

        expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId("ObjectToCSV")).not.toBeInTheDocument();
    });
});
