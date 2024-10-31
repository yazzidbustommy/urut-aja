import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import BiddingPayment from "../pages/customer pages/BiddingPayment";


const store = createStore(reducer)



describe("BiddingPayment component", () => {
 
    it("should render BiddingPayment page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <BiddingPayment/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});



