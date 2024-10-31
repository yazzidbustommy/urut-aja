import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import AccountPage from "../pages/admin pages/AccountPage";


const store = createStore(reducer)



describe("AccountPage component", () => {
 
    it("should render AccountPage page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <AccountPage/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })

    it("should display Modal Detail product button modal", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AccountPage />
                </BrowserRouter>
            </Provider>
        );

        const addButton = screen.getByTestId("open-detailAccount-button");
        fireEvent.click(addButton);

        const modal = screen.getByTestId("add-modal-package");
        expect(modal).toBeInTheDocument();
    });

   
 
});