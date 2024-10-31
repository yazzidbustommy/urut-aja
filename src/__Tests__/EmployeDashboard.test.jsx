import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import EmployeDashboard from "../pages/employe pages/EmployeDashboard";


const store = createStore(reducer)



describe("EmployeDashboard component", () => {
 
    it("should render EmployeDashboard page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <EmployeDashboard/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


