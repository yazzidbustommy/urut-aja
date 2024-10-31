import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import FinishPayment from "../pages/employe pages/FinishPayment";


const store = createStore(reducer)



describe("FinishPayment component", () => {
 
    it("should render FinishPayment page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <FinishPayment/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


