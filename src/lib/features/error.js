import { createSlice } from "@reduxjs/toolkit"
import { validation } from "../utils/validation"

/**
 * Retrieves, in validation object, errors corresponding to id passed in parameter and adds them to error state 
 * @function 
 * @param {string} inputId - input id 
 * @see errorAction.add 
 * @see validation
 */
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
 
/**
 * @typedef {object} error 
 * @description Redux component in charge of react Error component state - state : { status: {string}, error: {object} } 
 * @component 
 * @property {function} add - Add an error 
 * @property {function} clear - Remove errors encountered by a component 
 */
const { actions, reducer } = createSlice({
    name: "error", 
    initialState, 
    reducers: {

        /**
         * Add an error to error state 
         * @memberof error
         * @param {object} errorObject - contains output, what and why attributes 
         * @example `errorAction.add( errorObject = { what: "date", why: "tooShort", output: "inputId"} )` 
         */
        add: {

            /**
             * @param {object} errorObject 
             * @param {string} errorObject.output - output box id 
             * @param {string} errorObject.what - element concerned by the error 
             * @param {string} errorObject.why - why an error is thrown
             * @memberof error.add
             */
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

        /**
         * Remove errors encountered by a component 
         * @memberof error 
         * @example `errorAction.clear("inputId")` 
         */
        clear: {

            /**
             * @param {string} id - component id concerned by error(s) 
             * @memberof param.clear
             */
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