import { createSlice } from "@reduxjs/toolkit";
import { getLimitYear, transformToNumber } from "../utils/date";


const dateObject = { day: false, month: false, year: false}
const timeObject = { hour: false, minute: false}

/**
 * @param {object} draft 
 * @param {string} id 
 * @param {string} type - accept date, datePeriod, dateTime, dateTimePeriod, time, timePeriod  
 */
function setInitialDateState(draft, id, type) { 
    let timeAttributes = type.indexOf("date") >= 0 ? type.indexOf("ime") >= 0 ? {...dateObject, ...timeObject} 
                        : dateObject : timeObject
    if( type.indexOf("Period") > 0 ){ 
        timeAttributes = { start: timeAttributes, end: timeAttributes, calendar: timeAttributes }
    } else { timeAttributes = { calendar: timeAttributes, ...timeAttributes } }
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

/**
 * Redux component in charge of selected dates state - 
 * state : { status: {string}, dates: {object} } - 
 * state.dates : { selectedDate1Id, selectedDate2Id, ... }
 * state.dates.selectedDate1Id : { day: {number}, month: {number}, year: {number}, hour: {number}, minute: {number} }
 * @name selectedDate 
 */
const { actions, reducer } = createSlice({

    name: "selectedDate", 
    initialState, 

    reducers: {

        /**
         * Initializes selected dates state of element corresponding to id passed as parameter
         * @memberof selectedDate
         */
        init: {

            /**
            * @memberof selectedDate.init
            * @param {string} id 
            * @param {string} type - accept date, datePeriod, dateTime, dateTimePeriod, time, timePeriod 
            */
            prepare: (id, type) => ({
                payload: {id, type}
            }),

            reducer: (draft, action) => {
                if(draft.dates[action.payload.id] && draft.dates[action.payload.id].status === "default"){ return }
                setInitialDateState(draft, action.payload.id, action.payload.type)
                draft.status = draft.status === "empty" ? 1 : draft.status+1
                return
            }
        },

        /**
         * Initializes calendars state of element corresponding to id passed as parameter
         * @memberof selectedDate
         */
        initCalendar: {

            /**
            * @memberof selectedDate.initCalendar
            * @param {string} id 
            */
            prepare: (id) => ({
                payload: {id}
            }),

            reducer: (draft, action) => {
                const id = action.payload.id
                draft.dates[id].status = "default"
                if(draft.dates[id].type.indexOf("date") === 0){
                    draft.dates[id].calendar.day = false
                    draft.dates[id].calendar.month = false
                    draft.dates[id].calendar.year = false
                }
                return
            }
        },

        /**
         * Set day displayed to calendar
         * @memberof selectedDate
         */
        setCalendarDay: {

            /**
             * @memberof selectedDate.setCalendarDay
             * @param {number} day 
             * @param {string} inputId 
             */
            prepare: (day, inputId) => ({
                payload: {day, inputId}
            }),

            reducer: (draft, action) => {
                const day = parseInt(action.payload.day)
                if(day < 1 || day > 31){ return }
                const inputId = action.payload.inputId 
                draft.dates[inputId].calendar.day = day 
                return
            }
        },

        /**
         * Set hour displayed to calendar
         * @memberof selectedDate
         */
        setCalendarHour: {

            /**
             * @memberof selectedDate.setCalendarHour
             * @param {number} hour 
             * @param {string} inputId 
             */
            prepare: (hour, inputId) => ({
                payload: {hour, inputId}
            }),

            reducer: (draft, action) => {
                const hour = parseInt(action.payload.hour)
                if(hour < 0 || hour >= 24){ return }
                const inputId = action.payload.inputId 
                draft.dates[inputId].calendar.hour = hour
                return
            }
        },

        /**
         * Set minutes displayed to calendar
         * @memberof selectedDate
         */
        setCalendarMinute: {

            /**
             * @memberof selectedDate.setCalendarMinute
             * @param {number} minute 
             * @param {string} inputId 
             */
            prepare: (minute, inputId) => ({
                payload: {minute, inputId}
            }),

            reducer: (draft, action) => {
                const minute = parseInt(action.payload.minute)
                if(minute < 0 || minute > 59){ return }
                const inputId = action.payload.inputId 
                draft.dates[inputId].calendar.minute = minute 
                return
            }
        },

        /**
         * Set month displayed to calendar
         * @memberof selectedDate
         */
        setCalendarMonth: {

            /**
             * @memberof selectedDate.setCalendarMonth
             * @param {number} month 
             * @param {string} inputId 
             */
            prepare: (month, inputId) => ({
                payload: {month, inputId}
            }),

            reducer: (draft, action) => {
                const month = parseInt(action.payload.month)
                if(month < 1 || month > 12){ return }
                const inputId = action.payload.inputId 
                draft.dates[inputId].calendar.month = month 
                return
            }
        },

        /**
         * Set year displayed to calendar
         * @memberof selectedDate
         */
        setCalendarYear: {

            /**
             * @memberof selectedDate.setCalendarYear
             * @param {number} year 
             * @param {string} inputId 
             */
            prepare: (year, inputId) => ({
                payload: {year, inputId}
            }),

            reducer: (draft, action) => {
                const year = parseInt(action.payload.year)
                if(year < getLimitYear("min") || year > getLimitYear("max")){ return }
                const inputId = action.payload.inputId 
                draft.dates[inputId].calendar.year = year 
                return
            }
        },

        /**
         * Set selected day
         * @memberof selectedDate
         */
        setDay: {

            /**
             * @memberof selectedDate.setDay
             * @param {number} day 
             * @param {string} inputId 
             * @param {string | boolean} typeDate - accept start, end or false
             */
            prepare: (day, inputId, typeDate) => ({
                payload: {day, inputId, typeDate}
            }),

            reducer: (draft, action) => {
                const day = parseInt(action.payload.day)
                if(day < 1 || day > 31){ return }
                const inputId = action.payload.inputId 
                const typeDate = action.payload.typeDate
                if(typeDate){
                    draft.dates[inputId][typeDate].day = transformToNumber(day)
                    if(typeDate === "start"){ draft.dates[inputId].calendar.day = day }
                } else { 
                    draft.dates[inputId].day = transformToNumber(day) 
                    draft.dates[inputId].calendar.day = day 
                }
                if(draft.dates[inputId].status !== "selected" && (
                    draft.dates[inputId].type.indexOf("Period") < 0 || ( 
                        typeDate === "end" && draft.dates[inputId].start.day !== draft.dates[inputId].end.day
                    ))){ draft.dates[inputId].status = "selected" 
                } else if(typeDate === "start"){ draft.dates[inputId].status = "pending" }
                return
            }
        },

        /**
         * Set selected hour
         * @memberof selectedDate
         */
        setHour: {

            /**
             * @memberof selectedDate.setHour
             * @param {number} hour 
             * @param {string} inputId 
             * @param {string | boolean} typeDate - accept start, end or false
             */
            prepare: (hour, inputId, typeDate) => ({
                payload: {hour, inputId, typeDate}
            }),

            reducer: (draft, action) => {
                const hour = parseInt(action.payload.hour)
                if(hour < 0 || hour >= 24){ return }
                const inputId = action.payload.inputId 
                const typeDate = action.payload.typeDate
                if(typeDate){
                    draft.dates[inputId][typeDate].hour = transformToNumber(hour)
                    if(typeDate === "start"){ draft.dates[inputId].calendar.hour = hour }
                } else { 
                    draft.dates[inputId].hour = transformToNumber(hour) 
                    draft.dates[inputId].calendar.hour = hour 
                }
                if(draft.dates[inputId].status !== "selected" && (
                    draft.dates[inputId].type.indexOf("Period") < 0 || ( 
                        typeDate === "end" && draft.dates[inputId].start.hour !== draft.dates[inputId].end.hour
                    ))){ draft.dates[inputId].status = "selected"}
                return
            }
        },

        /**
         * Set selected minute
         * @memberof selectedDate
         */
        setMinute: {

            /**
             * @memberof selectedDate.setMinute
             * @param {number} minute 
             * @param {string} inputId 
             * @param {string | boolean} typeDate - accept start, end or false
             */
            prepare: (minute, inputId, typeDate) => ({
                payload: {minute, inputId, typeDate}
            }),

            reducer: (draft, action) => {
                const minute = parseInt(action.payload.minute)
                if(minute < 0 || minute > 59){ return }
                const inputId = action.payload.inputId 
                const typeDate = action.payload.typeDate
                if(typeDate){
                    draft.dates[inputId][typeDate].minute = transformToNumber(minute)
                    if(typeDate === "start"){ draft.dates[inputId].calendar.minute = minute }
                } else { 
                    draft.dates[inputId].minute = transformToNumber(minute) 
                    draft.dates[inputId].calendar.minute = minute 
                }
                if(draft.dates[inputId].status !== "selected" && (
                    draft.dates[inputId].type.indexOf("Period") < 0 || ( 
                        typeDate === "end" && draft.dates[inputId].start.minute !== draft.dates[inputId].end.minute
                    ))){ draft.dates[inputId].status = "selected"}
                return
            }
        },

        /**
         * Set selected Month
         * @memberof selectedDate
         */
        setMonth: {

            /**
             * @memberof selectedDate.setMonth
             * @param {number} month 
             * @param {string} inputId 
             * @param {string | boolean} typeDate - accept start, end or false
             */
            prepare: (month, inputId, typeDate) => ({
                payload: {month, inputId, typeDate}
            }),

            reducer: (draft, action) => {
                const month = parseInt(action.payload.month)
                if(month < 1 || month > 12){ return }
                const inputId = action.payload.inputId 
                const typeDate = action.payload.typeDate
                if(typeDate){
                    draft.dates[inputId][typeDate].month = transformToNumber(month)
                    if(typeDate === "start"){ draft.dates[inputId].calendar.month = month }
                } else { 
                    draft.dates[inputId].month = transformToNumber(month)
                    draft.dates[inputId].calendar.month = month 
                }
                if(draft.dates[inputId].status !== "selected" && (
                    draft.dates[inputId].type.indexOf("Period") < 0 || ( 
                        typeDate === "end" && draft.dates[inputId].start.month !== draft.dates[inputId].end.month
                    ))){ draft.dates[inputId].status = "selected"}
                return
            }
        },

        /**
         * Set selected year
         * @memberof selectedDate
         */
        setYear: {

            /**
             * @memberof selectedDate.setYear
             * @param {number} year 
             * @param {string} inputId 
             * @param {string | boolean} typeDate - accept start, end or false
             */
            prepare: (year, inputId, typeDate) => ({
                payload: {year, inputId, typeDate}
            }),

            reducer: (draft, action) => {
                const year = parseInt(action.payload.year)
                if(year < getLimitYear("min") || year > getLimitYear("max")){ return }
                const inputId = action.payload.inputId 
                const typeDate = action.payload.typeDate
                if(typeDate){
                    draft.dates[inputId][typeDate].year = transformToNumber(year)
                    if(typeDate === "start"){ draft.dates[inputId].calendar.year = year }
                } else { 
                    draft.dates[inputId].year = transformToNumber(year) 
                    draft.dates[inputId].calendar.year = year 
                }
                if(draft.dates[inputId].status !== "selected" && (
                    draft.dates[inputId].type.indexOf("Period") < 0 || ( 
                        typeDate === "end" && draft.dates[inputId].start.year !== draft.dates[inputId].end.year
                    ))){ draft.dates[inputId].status = "selected"}
                return
            }
        }
    }
})

export const { 
    init, 
    initCalendar, 
    set, 
    setCalendarDay, 
    setCalendarHour, 
    setCalendarMinute, 
    setCalendarMonth, 
    setCalendarYear, 
    setDay, 
    setHour, 
    setMinute, 
    setMonth, 
    setYear 
} = actions

export default reducer