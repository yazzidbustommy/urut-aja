import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import WaitingApprovalPage from "../pages/employe pages/WaitingApprovalPage";


const store = createStore(reducer)



describe("WaitingApprovalPage component", () => {
 
    it("should render WaitingApprovalPage page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <WaitingApprovalPage/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});


WaitingApprovalPage