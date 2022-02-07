import { datePattern, datePlaceholder, timePattern, timePlaceholder } from "./date";
import { datePickerParams } from "./datePickerParams";

/**
 * Provides input and param check methods
 */
 export const validation = {

    error: [],

    addError: (what, why, output) => {
        const errorObject = {  what, why, output }
        if(!validation.error.includes(errorObject)){ validation.error.push(errorObject) }
        return false
    },
 
    /**
     * provides allowed length 
     * contains dateInput, id, label attributes
     */
    allowedLength: {
        color: { max: 23, min: 3 },
        date: { max: 10, min: 10 },
        dateTime: { max: 16, min: 16 },
        id: { max: 25, min: 2 }, 
        label: { max: 60, min: 4 },
        time: {max: 5, min: 5}
    }, 

    /**
     * provides allowed type (return of typeof) 
     * contains eventFuntion attributes
     */
    allowedType: { eventFunction: "function" },

    checkColor: (color, output) => validation.checkString(color, "color", output),

    checkFormat: (format) => (validation.formats.pattern[format] && validation.formats.placeholder[format]) ? true : false,

    /**
     * @see validation.idRegExp
     * @param {string} datePickerId 
     * @returns {boolean}
     */
    checkId: (datePickerId, output) => validation.checkString(datePickerId, "id", output),

    /**
     * @see validation.dateInputRegExp
     * @param {string} value - date format : YYYY-MM-DD 
     * @returns {boolean}
     */
    checkInputValue: (value, output, type, strictValidation = false) => validation.checkString(value, type, output, strictValidation),

    /**
     * @see validation.labelRegExp
     * @param {string} datePickerLabel
     * @returns {boolean}
     */
    checkLabel: (datePickerLabel, output) => validation.checkString(datePickerLabel, "label", output),

    /**
     * controls the length and format of the string parameter
     * @param {string} string 
     * @param {string} stringName - accept dateInput, id or label
     * @returns {boolean}
     */
    checkString: (string, stringName, output, strictValidation = false) => {
        const stringLength = string.length
        const searchLetter = stringName === "date" || stringName === "dateTime" || stringName === "time" 
                            ? true : false
        if(searchLetter && !strictValidation){
            if( /[a-zA-Z?,;!§%*$£&+_()\/]/.test(string) ){
                return validation.addError(stringName, "wrongFormat", output)
            }
            if(stringLength < validation.allowedLength[stringName].min){ return false }
        }
        if(stringLength > validation.allowedLength[stringName].max){ 
            return validation.addError(stringName, "tooLong", output) 
        }
        if(stringLength < validation.allowedLength[stringName].min){
            return validation.addError(stringName, "tooShort", output)
        }
        if(!validation.regExpTest(string, stringName, output)){
            return validation.addError(stringName, "wrongFormat", output)
        }
        return string
    },

    checkType: (itemToCheck, itemName, output) => {
        if(typeof itemToCheck !== validation.allowedType[itemName]){
            return validation.addError(itemName, "wrongType", output)
        }
        return true
    },

    /**
     * clear error attribute and error message displayed
     */
    clearError: () => { validation.error = [] },

    formats: {
        get: (type, outputFormat = "number") => {
            let langOpt = 0
            if(type !== "time"){
                switch(validation.formats.lang){
                    case "de": 
                        langOpt = 3
                        break
                    case "es": case "it":  
                        langOpt = 2
                        break
                    case "fr": 
                        langOpt = 1 
                        break 
                    default: break
                }
            }
            return validation.formats.getObject(
                outputFormat === "number" ? validation.formats.output[outputFormat] : validation.formats.output[outputFormat][type], 
                validation.formats.pattern[type][langOpt], 
                validation.formats.placeholder[type][langOpt],
                validation.formats.regExp[type][langOpt]
            )
        },
        getObject: (output, pattern, placeholder, regExp, expectedLenght) => { return { output, pattern, placeholder, regExp, expectedLenght }},
        getOptions: (time = false) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            return time ? { hour: 'numeric', minute: 'numeric', ...options } : options
        },
        lang: navigator.language.substring(0,2),
        output: {
            array: {
                date: (date) => date && date.split(date.indexOf("-") > 0 ? "-" : "."), 
                dateTime: (dateTime) => {
                    if(dateTime){
                        const dateTimeArray = dateTime.split(" ") 
                        return  [ ...validation.formats.output.array.date(dateTimeArray[0]), ...validation.formats.output.array.time(dateTimeArray[1])] 
                    }
                },
                time: (time) => time && time.split(":"),
            },
            dateObject: {
                date: (date) => date && validation.formats.output.dateObject.fct(date, "date"), 
                dateTime: (dateTime) => dateTime && validation.formats.output.dateObject.fct(dateTime, "dateTime"), 
                fct: (date, type) => {
                    if(!date){ return false }
                    date = validation.formats.output.array[type](date)
                    return type === "time" ? { hour: date[0], minute: date[1] }
                    : type === "date" ? new Date(
                        date[validation.formats.lang === "en" ? 0 : 2], 
                        parseInt(date[1]) - 1, 
                        date[validation.formats.lang === "en" ? 2 : 0]
                    ) : new Date(
                        date[validation.formats.lang === "en" ? 0 : 2], 
                        parseInt(date[1]) - 1, 
                        date[validation.formats.lang === "en" ? 2 : 0], 
                        date[3] && date[3], 
                        date[4] && date[4]
                    )
                }, 
                time: (time) => time && validation.formats.output.dateObject.fct(time, "time")
            },
            number: "number",
            string: {
                date: (date) => date && validation.formats.output.string.fct(date, false),
                dateTime: (date) => date && validation.formats.output.string.fct(date, true), 
                fct: (date, isDateTime = false) => new Intl.DateTimeFormat(
                    undefined, 
                    validation.formats.getOptions(isDateTime)).format(
                        validation.formats.output.dateObject[isDateTime ? "dateTime" : "date"](date)
                    ),
                time: (date) => date && date.toLocalTimeString()
            }
        },
        pattern: {
            date: datePattern, 
            dateTime: [ 
                datePattern[0] +" "+ timePattern, 
                datePattern[1] +" "+ timePattern, 
                datePattern[2] +" "+ timePattern, 
                datePattern[3] +" "+ timePattern
            ],
            time: [timePattern]
        }, 
        placeholder: {
            date: datePlaceholder, 
            dateTime: [
                datePlaceholder[0] +" "+ timePlaceholder,
                datePlaceholder[1] +" "+ timePlaceholder,
                datePlaceholder[2] +" "+ timePlaceholder,
                datePlaceholder[3] +" "+ timePlaceholder
            ],
            time: [timePlaceholder]
        },
        regExp: {
            date: [/^\d{4}-\d{2}-\d{2}$/, /^\d{2}-\d{2}-\d{4}$/, /^\d{1}-\d{1}-\d{4}$/, /^\d{1}.\d{1}.\d{4}$/], 
            dateTime: [
                /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/, 
                /^\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}$/, 
                /^\d{1}-\d{1}-\d{4}\s\d{2}:\d{2}$/, 
                /^\d{1}.\d{1}.\d{4}\s\d{2}:\d{2}$/
            ],
            time: /^\s\d{2}:\d{2}/
        }
    },

    regExpTest(string, stringName, output){
        const regVal = stringName === "id" ? ["^[a-zA-Z0-9-]+$", "g"] 
                    : stringName === "label" ? ["^[a-zA-Z0-9 -/']+$", "g"] 
                    : stringName === "color" ? ["^[rh#][a-zA-Z0-9]+$", "g"] 
                    : datePickerParams.format[output].regExp 
        const regEx = Array.isArray(regVal) ? new RegExp(regVal[0], regVal[1]) : new RegExp(regVal)
        return regEx.test(string)
    }

};