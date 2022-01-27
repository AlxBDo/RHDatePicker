import { createSlice } from "@reduxjs/toolkit";

import { currentDate, getLimitYear, transformToNumber } from "../utils/date";
import { validation } from "../utils/validation";


function setInitialDraft(draft, dateId) {
    draft[dateId] = {
        status: "default", 
        ...currentDate
    }
}

const initialState = { 
    status: "empty", 
    dates: {}
}

const { actions, reducer } = createSlice({
    name: "selectedDate", 
    initialState, 
    reducers: {
        init: {
            prepare: (id) => ({
                payload: {id}
            }),
            reducer: (draft, action) => {
                draft.dates[action.payload.id] = { status: "default", ...currentDate }
                draft.status = draft.status === "empty" ? 1 : draft.status+1
                return
            }
        },
        set: {
            prepare: (date, inputId) => ({
                payload: {date, inputId}
            }),
            reducer: (draft, action) => {
                const dateTemp = action.payload.date
                if(!validation.checkInputValue(dateTemp)){
                    return
                }
                const inputId = action.payload.inputId
                const dateSplited = dateTemp.split("-")
                draft.dates[inputId] = { status : "selected", day: dateSplited[2], month: dateSplited[1], year: dateSplited[0] }
                return
            }
        },
        setDay: {
            prepare: (day, inputId) => ({
                payload: {day, inputId}
            }),
            reducer: (draft, action) => {
                const day = parseInt(action.payload.day)
                const inputId = action.payload.inputId
                if(day < 1 && day > 31){ return }
                draft.dates[inputId].day = transformToNumber(day) 
                if(draft.dates[inputId].status !== "selected"){ draft.dates[inputId].status = "selected"}
                return
            }
        },
        setMonth: {
            prepare: (month, inputId) => ({
                payload: {month, inputId}
            }),
            reducer: (draft, action) => {
                const month = parseInt(action.payload.month)
                const inputId = action.payload.inputId
                if(month < 1 && month > 12){ return }
                draft.dates[inputId].month = transformToNumber(month) 
                if(draft.dates[inputId].status !== "selected"){ draft.dates[inputId].status = "selected"}
                return
            }
        },
        setYear: {
            prepare: (year, inputId) => ({
                payload: {year, inputId}
            }),
            reducer: (draft, action) => {
                const year = parseInt(action.payload.year)
                const inputId = action.payload.inputId
                if(year < getLimitYear("min") && year > getLimitYear("max")){ return }
                draft.dates[inputId].year = year 
                if(draft.dates[inputId].status !== "selected"){ draft.dates[inputId].status = "selected"}
                return
            }
        }
    }
})

export const { init, set, setDay, setMonth, setYear } = actions

export default reducer