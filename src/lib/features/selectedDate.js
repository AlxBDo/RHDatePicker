import { createSlice } from "@reduxjs/toolkit";

import { currentDate, getLimitYear, transformToNumber } from "../utils/date";
import { validation } from "../utils/validation";

const defaultTime = { hour: 12, minute: transformToNumber(0) }

function setInitialDateState(draft, id, type) { 
    let timeAttributes = type === "time" ? defaultTime 
                    : type === "date" ? currentDate : {...currentDate, ...defaultTime}
    if( type.indexOf("Period") > 0 ){ timeAttributes = { start: timeAttributes, end: timeAttributes }}
    draft.dates[id] = {
        status: "default", 
        type,
        ...timeAttributes
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
            prepare: (id, type) => ({
                payload: {id, type}
            }),
            reducer: (draft, action) => {
                setInitialDateState(draft, action.payload.id, action.payload.type)
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
        setHour: {
            prepare: (hour, inputId) => ({
                payload: {hour, inputId}
            }),
            reducer: (draft, action) => {
                const hour = parseInt(action.payload.hour)
                const inputId = action.payload.inputId
                if(hour < 0 && hour >= 24){ return }
                draft.dates[inputId].hour = transformToNumber(hour) 
                if(draft.dates[inputId].status !== "selected"){ draft.dates[inputId].status = "selected"}
                return
            }
        },
        setMinute: {
            prepare: (minute, inputId) => ({
                payload: {minute, inputId}
            }),
            reducer: (draft, action) => {
                const minute = parseInt(action.payload.minute)
                const inputId = action.payload.inputId
                if(minute < 0 && minute > 59){ return }
                draft.dates[inputId].minute = transformToNumber(minute) 
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

export const { init, set, setDay, setHour, setMinute, setMonth, setYear } = actions

export default reducer