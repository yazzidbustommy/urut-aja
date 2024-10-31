import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import AvailabilityPage from "../pages/employe pages/AvailabilityPage";


const store = createStore(reducer)



describe("AvailabilityPage component", () => {
 
    it("should render AvailabilityPage page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <AvailabilityPage/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


