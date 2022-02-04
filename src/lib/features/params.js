import { createSlice } from "@reduxjs/toolkit";

import { currentDate, currentTime } from "../utils/date";
import { validation } from "../utils/validation";


const initialState = { status: "void", display: {}, checked: [], dates: {} }

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
        setDate: {
            prepare: (id, date, typeDate) => ({
                payload: {id, date, typeDate}
            }),
            reducer: (draft, action) => {
                const id = action.payload.id
                if(draft.checked.indexOf(id) >= 0){
                    const date = action.payload.date
                    if(date.type.indexOf("date") >= 0){
                        draft.dates[id] = { 
                            day: date.day ? date.day : currentDate.day, 
                            month: date.month ? date.month : currentDate.month, 
                            year: date.year ? date.year : currentDate.year
                        }
                    }
                    if(date.type.indexOf("ime") > 0){
                        draft.dates[id] = { 
                            hour: date.hour ? date.hour : currentTime.hour, 
                            minute: date.minute ? date.minute : currentTime.minute 
                        }
                    }
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

export const { init, setDate, setDisplay, updateDisplay } = actions

export default reducer