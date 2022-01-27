
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
        color: {max: 23, min: 3},
        date: {max: 10, min: 10},
        id: { max: 15, min: 2 }, 
        label: { max: 35, min: 4 }
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
    checkInputValue: (value, output, strictValidation = false) => validation.checkString(value, "date", output, strictValidation),

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
        if(stringName === "date"){
            if( !/[0-9\-]/.test(string) || (stringLength !== 10 && strictValidation) ){
                return validation.addError(stringName, "wrongFormat", output)
            }
            if(stringLength !== 10){ return false }
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
        get: (outputFormat = "number") => {
            let langOpt = 0
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
            return validation.formats.getObject(
                validation.formats.output[outputFormat], 
                validation.formats.pattern[langOpt], 
                validation.formats.placeholder[langOpt],
                validation.formats.regExp[langOpt]
            )
        },
        getObject: (output, pattern, placeholder, regExp) => { return { output, pattern, placeholder, regExp}},
        getOptions: (time = false) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            return time ? { hour: 'numeric', minute: 'numeric', ...options } : options
        },
        lang: navigator.language,
        output: {
            array: (date) => date && date.split(date.indexOf("-") > 0 ? "-" : "."),
            dateObject: (date) => {
                if(!date){ return false }
                date = validation.formats.output.array(date)
                return new Date(date[validation.formats.lang === "en" ? 0 : 2], parseInt(date[1]) - 1, date[validation.formats.lang === "en" ? 2 : 0])
            },
            number: "number",
            string: (date, isDateTime = false) => new Intl.DateTimeFormat(
                undefined, 
                validation.formats.getOptions(isDateTime)).format(validation.formats.output.dateObject(date))
        },
        pattern: ["[0-9]{4}-[0-9]{2}-[0-9]{2}", "[0-9]{2}-[0-9]{2}-[0-9]{4}", "[0-9]{1}-[0-9]{1}-[0-9]{4}", "[0-9]{1}.[0-9]{1}.[0-9]{4}"], 
        placeholder: ["YYYY-MM-DD", "JJ-MM-AAAA", "J-M-AAAA", "J.M.AAAA"],
        regExp: [/^\d{4}-\d{2}-\d{2}$/, /^\d{2}-\d{2}-\d{4}$/, /^\d{1}-\d{1}-\d{4}$/, /^\d{1}.\d{1}.\d{4}$/]
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