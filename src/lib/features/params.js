import { createSlice } from "@reduxjs/toolkit";


const initialState = { status: "void", display: {}, checked: [] }

/**
 * @typedef {object} params 
 * @component 
 * @description Redux component in charge of params state - state : { status: {string}, display: {object}, checked: {array} }
 * @property {function} init - Initializes state params of element corresponding to id passed as parameter 
 * @property {function} setDisplay - Manages display state of element corresponding to id passed in 1st parameters 
 * @property {function} updateDisplay - Update display state of element corresponding to id passed in 1st parameters 
 */
const { actions, reducer } = createSlice({
    name: "params", 
    initialState, 
    reducers: {

        /**
         * Initializes state params of element corresponding to id passed as parameter 
         * @memberof params 
         * @param {string} id 
         * @example `paramsAction.init( {string} id )`
         */
        init: {
            
            prepare: (id) => ({
                payload: {id}
            }),

            reducer: (draft, action) => {
                const id = action.payload.id
                if(id !== "paramError"){
                    draft.checked = [id, ...draft.checked]
                    draft.status = "defined"
                }
                return
            }
        },
        
        /**
         * Manages display state of element corresponding to id passed in 1st parameters
         * @memberof params 
         * @param {string} id 
         * @param {boolean} value - true : element is displayed 
         * @example `paramsAction.setDisplay( {string} id, {boolean} value )`
         */
        setDisplay: {

            prepare: (id, value = false) => ({
                payload: {id, value}
            }),

            reducer: (draft, action) => {
                const id = action.payload.id
                draft.display[id] = action.payload.value
                return
            }
        },
        
        /**
         * Update display state of element corresponding to id passed in 1st parameters
         * @memberof params 
         * @param {string} id 
         * @param {boolean} value - true : element is displayed 
         * @example `paramsAction.updatetDisplay( {string} id, {boolean} value )`
         */
        updateDisplay: {

            prepare: (id, value) => ({
                payload: {id, value}
            }),

            reducer: (draft, action) => {
                draft.display[action.payload.id] = action.payload.value
                return
            }
        },
    }
})

export const { init, setDisplay, updateDisplay } = actions

export default reducer