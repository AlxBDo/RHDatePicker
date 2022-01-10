import React, { useEffect } from "react";

const validation = {

    error: false,
    inputId: undefined,

    allowedLength: {
        id: { max: 15, min: 2 }, 
        label: { max: 35, min: 4 }
    }, 

    allowedType: { onChangeFunction: "function" },

    clearError: () => {
        validation.error = false 
        validation.displayError()
    },

    dateInputRegExp: new RegExp(/^\d{4}-\d{2}-\d{2}$/),

    displayError: () => { 
        if(validation.error){
            document.getElementById(`${validation.inputId}-err-msg`).style.display = "block"
            document.getElementById(`${validation.inputId}-err-msg`).innerHTML = validation.getError()
        } else {
            document.getElementById(`${validation.inputId}-err-msg`).style.display = "none"
        }
    },

    idRegExp: new RegExp("^[a-zA-Z0-9-]+$", "g"),

    labelRegExp: new RegExp("^[a-zA-Z0-9 -/']+$", "g"),

    checkId: (datePickerId) => validation.checkString(datePickerId, "id"),

    checkEventFunction: (e, eventFunction, checkInputValue = true) => {
        validation.clearError()
        const value = e.target.value
        if(checkInputValue){
            if(!validation.dateInputRegExp.test(value)){
                validation.error = { what: "date", why: "wrongFormat" }
            }
            if(typeof eventFunction !== "function"){
                validation.error = { what: "eventFunction", why: "wrongType" }
            }
        }
        !validation.error ? eventFunction(checkInputValue && value) : validation.displayError()
    },

    checkLabel: (datePickerLabel) => validation.checkString(datePickerLabel, "label"),

    checkString: (string, stringName) => {
        const stringLength = string.length
        if(stringLength > validation.allowedLength[stringName].max){ 
            validation.error = { what: stringName, why: "tooLong" } 
        }
        if(stringLength < validation.allowedLength[stringName].min){
            validation.error = {  what: stringName, why: "tooShort" }
        }
        if(!validation[stringName+"RegExp"].test(string)){
            validation.error = {  what: stringName, why: "wrongFormat" }
        }
        return !validation.error
    },

    getError: () => errorMessage.get(validation.error)

};
 
const errorMessage = { 

    allowed: {

        length: ({max, min}) => `Its length must be between ${min} and ${max} characters.`,

        format: (what) => {
            switch(what){
                case "date":
                    return "Date format must be : YYYY-MM-DD ."
                case "id":
                    return "Only alphanumeric characters are allowed."
                case "label":
                    return "Only alphanumeric characters, hyphen and apostrophe are allowed."
                default: 
                    return "Impossible to determinate good format !"
            }
        },

        type: (expectedType) => `The expected type is ${expectedType}`

    },

    get: (errorObj) => errorObj.what + " " + errorMessage[errorObj.why](errorObj.what),

    tooLong: (what) => `is too long ! 
    <p>${errorMessage.allowed.length(validation.allowedLength[what])}</p>`,

    tooShort: (what) => `is too short ! 
    <p>${errorMessage.allowed.length(validation.allowedLength[what])}</p>`,

    wrongFormat: (what) => `is in wrong format ! 
    <p>${errorMessage.allowed.format(what)}</p>`,

    wrongType: (what) => `is in wrong type ! 
    <p>${errorMessage.allowed.type(validation.allowedType[what])}</p>` 

};

const localFormat = {
    de: "de-DE",
    fr: 'fr-FR',
    gb: 'en-GB',
    us: 'en-US',
    get : (country) => localFormat[country] ? localFormat[country] : localFormat.us
};

/**
 * Check and display input type date
 * @param {object} param
 * @param {string} param.inputId 
 * @param {string} param.label 
 * @param {object} param.eventFunction - contains function to apply to events
 * @example { onBlur: onBlurFunction, onChange: onChangeFunction, onClick: onClickFunction }
 * @param {object} param.htmlClass - contains classes to apply to the container, to the input and to the error message
 * @example { container: "container-class", input: "input-class", error: "error-class" }
 * @returns {object}
 */
const DatePicker = ({
    inputId, 
    label, 
    eventFunction = false,
    htmlClass = {}
}) => {

    if(!validation.checkId(inputId)){ inputId = "param" }
    validation.inputId = inputId

    useEffect(()=>{
        if(inputId === "param"){ validation.displayError() }
    },[inputId])

    return(
        <div className={ htmlClass.container && (`${htmlClass.container}`)}>
            { validation.checkLabel(label) && ( <label htmlFor={inputId}>{label}</label> ) }
            { inputId !== "param" && (
                <input 
                    type="date" 
                    id={inputId} 
                    name={inputId} 
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" 
                    className={ htmlClass.input && (`${htmlClass.input}`) }
                    onChange={ (e) => { 
                        eventFunction.onChange && validation.checkEventFunction(e, eventFunction.onChange) } }
                    onClick={ (e) => { 
                        eventFunction.onClick && validation.checkEventFunction(e, eventFunction.onClick, false) } }
                    onBlur={ (e) => { 
                        eventFunction.onBlur && validation.checkEventFunction(e, eventFunction.onBlur) } }
                    required 
                />
            ) }
            <div id={`${inputId}-err-msg`} className={ htmlClass.error && `${htmlClass.error}` }>
                { validation.error && validation.getError() }
            </div>
        </div>
    )

};

export default DatePicker;