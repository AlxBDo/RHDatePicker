import { render as rtlRender } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import errorReducer from "./lib/features/error" 
import paramsReducer from "./lib/features/params" 
import selectedDateReducer from "./lib/features/selectedDate" 

export function render(ui, options) {
 
    const store = configureStore({
        reducer: {
            error: errorReducer, 
            params: paramsReducer, 
            selectedDate: selectedDateReducer
        }
    })

    function Wrapper({ children }) {
        return(
            <Provider store={store}>{ children }</Provider>
        )
    }

    rtlRender(ui, { wrapper: Wrapper })

}