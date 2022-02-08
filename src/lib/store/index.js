import { configureStore } from "@reduxjs/toolkit"

import errorReducer from "../features/error"
import paramsReducer from "../features/params"
import selectedDateReducer from "../features/selectedDate"

export default configureStore({
    reducer: {
        error: errorReducer,
        params: paramsReducer,
        selectedDate: selectedDateReducer
    }
})