import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import Transaction from "../pages/admin pages/Transaction";


const store = createStore(reducer)



describe("Transaction component", () => {
 
    it("should render Transaction page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Transaction/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});