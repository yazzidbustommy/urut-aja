
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import OfferPage from "../pages/employe pages/OfferPage";


const store = createStore(reducer)



describe("OfferPage component", () => {
 
    it("should render OfferPage page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <OfferPage/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


