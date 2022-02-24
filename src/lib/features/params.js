import { createSlice } from "@reduxjs/toolkit";


const initialState = { status: "void", display: {}, checked: [] }

/**
 * Redux component in charge of params state - state : { status: {string}, display: {object}, checked: {array} }
 * @name params 
 */
const { actions, reducer } = createSlice({
    name: "params", 
    initialState, 
    reducers: {

        /**
         * Initializes state params of element corresponding to id passed as parameter
         * @memberof params
         */
        init: {
            
            /**
            * @memberof params.init
            * @param {string} id 
            */
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
         */
        setDisplay: {

            /**
            * @memberof params.setDisplay
            * @param {string} id 
            * @param {boolean} value - true : element is displayed
            */
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
         */
        updateDisplay: {

            /**
            * @memberof params.updateDisplay
            * @param {string} id 
            * @param {boolean} value - true : element is displayed
            */
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