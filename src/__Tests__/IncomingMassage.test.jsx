import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import IncomingMassage from "../pages/customer pages/IncomingMassage";


const store = createStore(reducer)



describe("IncomingMassage component", () => {
 
    it("should render IncomingMassage page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <IncomingMassage/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});




