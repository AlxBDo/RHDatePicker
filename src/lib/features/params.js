import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: "void", display: {}, checked: [] }

const { actions, reducer } = createSlice({
    name: "params", 
    initialState, 
    reducers: {
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