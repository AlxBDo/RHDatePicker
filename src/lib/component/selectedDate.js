import { createSlice } from "@reduxjs/toolkit";


const validation = {

    currentDate: new Date(),

    currentYear: validation.currentDate.getFullYear(),

    error: false,

    idLength: { max: 15, min: 2 }, 

    idRegExp: new RegExp("^[a-zA-Z0-9]+$", "g"),

    checkDay: (day) => validation.checkInteger(day, 1, 31),

    checkId: (id) => {
        const idL = id.length
        if(!(idL >= validation.idLength.min)){ 
            validation.error = { what: "Name id", why: "tooLong" } 
            return false
        }
        if(!(idL <= validation.idLength.max)){
            validation.error = {  what: "Name id", why: "tooShort" }
            return false
        }
        if(!validation.idRegExp.test(id)){
            validation.error = {  what: "Name id", why: "wrongCharacters" }
            return false
        }
        return true
    },

    checkInteger: (integerToCheck, minAllowed, maxAllowed) => Number.isInteger(integerToCheck) 
                    && integerToCheck >= minAllowed && integerToCheck <= maxAllowed ? true : false,

    checkYear: (year) => validation.checkInteger(year, validation.getMinYear(), validation.getMaxYear()), 

    getError: () => { return validation.error.what + " " + errorMessage[validation.error.why] },

    getMaxYear: () => { return validation.currentYear + 11 },

    getMinYear: () => { return validation.currentYear - 60 },

}

const errorMessage = { 

    allowed: {

        length: `Its length must be between ${validation.idLength.min} 
        and ${validation.idLength.max} characters.`,

        format: "Only alphanumeric characters are allowed."

    },

    tooLong: `is too long ! 
    ${errorMessage.allowed.length}`,

    tooShort: `is too short ! 
    ${errorMessage.allowed.length}`,

    wrongCharacters: `is in wrong format ! 
    ${errorMessage.allowed.format}`

}

const preState = { day: null, month: null, year: null }

function setInitialDraft(draft, dateId) {
    if(!validation.checkId(dateId)){ draft['error'] = { 
            status: 'failed', 
            error: validation.getError(), 
            ...preState
    }} else if(draft[dateId] === undefined){ draft[dateId] = { 
        status: 'void', 
        error: false, 
        ...preState
    }}
}

const initialState = { }

const { actions, reducer } = createSlice({
    name: "selectedDate", 
    initialState, 
    reducers: {
        create: {
            prepare: (id) => ({
                payload: {id}
            }),
            reducer: (draft, action) => {
                setInitialDraft(draft, action.payload.id)
                return
            }
        }
    }
})

export default reducer