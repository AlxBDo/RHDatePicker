import { createSlice } from "@reduxjs/toolkit"

import { selectError } from "../utils/selectors"
import { validation } from "../utils/validation"

export const getErrors = (inputId) => {
    return (dispatch) => {
        if(validation.error.length > 0){ 
            validation.error.forEach( 
                (err) => (err.output === inputId ) && dispatch(actions.add(err)) 
            )
            validation.clearError()
        }
    }
}

const initialState = { 
    status: "empty", 
    error: {}
}

const { actions, reducer } = createSlice({
    name: "error", 
    initialState, 
    reducers: {
        add: {
            prepare: (errorObject) => ({
                payload: {errorObject}
            }),
            reducer: (draft, action) => {
                if(
                    !action.payload.errorObject 
                    || (!action.payload.errorObject.what 
                        && !action.payload.errorObject.why 
                        && !action.payload.errorObject.output)
                ){
                    console.error("errorObject must be object contains what and why attributes")
                    return
                }
                const error = action.payload.errorObject
                draft.error[error.output] = Array.isArray(draft.error[error.output]) ? [error, ...draft.error[error.output]] : [error]
                draft.status = draft.status === "empty" ? 1 : draft.status + 1
                return
            }
        },
        clear: {
            prepare: (id) => ({
                payload: {id}
            }),
            reducer: (draft, action) => {
                const id = action.payload.id
                if(draft.error[id]){
                    draft.status = draft.error[id].length === draft.status ? "empty" : parseInt(draft.status - draft.error[id].length)
                    delete draft.error[id]
                }
                return
            }
        }
    }
})

export const { add, clear } = actions

export default reducer