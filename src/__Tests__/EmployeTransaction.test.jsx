import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import EmployeTransaction from "../pages/employe pages/EmployeTransaction";


const store = createStore(reducer)



describe("EmployeTransaction component", () => {
 
    it("should render EmployeTransaction page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <EmployeTransaction/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


