import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import BiddingFeedback from "../pages/customer pages/BiddingFeedback";


const store = createStore(reducer)



describe("BiddingFeedback component", () => {
 
    it("should render BiddingFeedback page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <BiddingFeedback/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


