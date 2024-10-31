import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { createStore } from "redux";
import { reducer }  from "../store/store"; 
import { describe, it, expect } from "vitest"; 
import RecruitmentPage from "../pages/admin pages/RecruitmentPage";


const store = createStore(reducer)



describe("Recruitment component", () => {
 
    it("should render Recruitment page", () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <RecruitmentPage/>
                </BrowserRouter>
            </Provider>
        )
        expect(container).toBeDefined()
    })
   
 
});