import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import Home from "../pages/Home";
import { describe, it, expect } from "vitest"; 


const store = createStore(reducer)



describe("Home component", () => {
 
    it("should render Login page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});

