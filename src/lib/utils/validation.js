import { datePattern, datePlaceholder, timePattern, timePlaceholder } from "./date";
import { datePickerParams } from "./datePickerParams";

/**
 * @typedef {object} validation 
 * @description Provides input and parameter check methods 
 * @property {array} error - Stores errors in array 
 * @property {function} addError - Add an error object to error attribute 
 * @property {object} allowedLength - Provides allowed lengths. 
 * Contains dateInput, id, label attributes. 
 * These attributes contain an object having the min and max attributes. 
 * @property {object} allowedType - Provides allowed type (return of typeof). 
 * Contains eventFuntion attribute 
 * @property {function} checkColor - Checks that the color passed in parameter corresponds to the accepted format 
 * @property {function} checkFormat - Checks that the requested format matches the accepted format 
 * @property {function} checkId - Checks that id passed in parameter corresponds to the accepted format 
 * @property {function} checkInputValue - Checks that input value passed in parameter corresponds to the accepted format
 * @property {function} checkLabel - Checks that label passed in parameter corresponds to the accepted format 
 * @property {function} checkLimits - Checks that deadlines passed in parameter corresponds to the accepted format 
 * @property {function} checkString - Checks length and format of string parameter 
 * @property {function} checkType - Checks if type is allowed 
 * @property {function} clearError - clear error attribute and error message displayed 
 * @property {object} formats - Provides format control functions and information 
 * @property {function} regExpTest - Apply RegExp test function
 */
 export const validation = {
 
    error: [],

    /**
     * Add an error object to error attribute
     * @memberof validation 
     * @param {string} what - What is the problem element ?
     * @param {*} why - Why it throws an error ?
     * @param {*} output - Where should it show error message ?
     * @returns {boolean} false
     */
    addError: (what, why, output) => {
        const errorObject = {  what, why, output }
        if(!validation.error.includes(errorObject)){ validation.error.push(errorObject) }
        return false
    },
 
    allowedLength: {
        color: { max: 23, min: 3 },
        date: { max: 10, min: 10 },
        dateTime: { max: 16, min: 16 },
        id: { max: 25, min: 2 }, 
        label: { max: 60, min: 4 },
        time: {max: 5, min: 5}
    }, 

    allowedType: { eventFunction: "function" },

    /**
     * Checks that the color passed in parameter corresponds to the accepted format
     * @memberof validation 
     * @param {string} color 
     * @param {string} output - error box id
     * @returns {boolean} checkResult
     * @see validation.checkString
     */
    checkColor: (color, output) => validation.checkString(color, "color", output),

    /**
     * Checks that the requested format matches the accepted format
     * @memberof validation 
     * @param {string} format 
     * @returns {boolean}
     */
    checkFormat: (format) => (validation.formats.pattern[format] && validation.formats.placeholder[format]) ? true : false,

    /**
     * Checks that id passed in parameter corresponds to the accepted format
     * @memberof validation 
     * @param {string} datePickerId 
     * @param {string} output - error box id
     * @returns {boolean} checkResult
     * @see validation.checkString
     */
    checkId: (datePickerId, output) => validation.checkString(datePickerId, "id", output),

    /**
     * Checks that input value passed in parameter corresponds to the accepted format
     * @memberof validation 
     * @param {string} value - date format : YYYY-MM-DD 
     * @param {string} output - error box id
     * @param {string} type - accept date, dateTime, ...
     * @param {object} limits - deadlines object  
     * @param {boolean} strictValidation - true : apply strict validation
     * @returns {boolean} checkResult
     * @see validation.checkString
     */
    checkInputValue: (value, output, type, limits = false, strictValidation = false) => validation.checkString(value, type, output, limits, strictValidation),

    /**
     * Checks that label passed in parameter corresponds to the accepted format
     * @memberof validation 
     * @param {string} datePickerLabel
     * @param {string} output - error box id
     * @returns {boolean} checkResult
     * @see validation.checkString
     */
    checkLabel: (datePickerLabel, output) => validation.checkString(datePickerLabel, "label", output),

    /**
     * Checks that deadlines passed in parameter corresponds to the accepted format
     * @memberof validation 
     * @param {string} date
     * @param {object} limits - deadlines object  
     * @param {boolean} strictValidation - true : apply strict validation
     * @returns {boolean} checkResult
     */
    checkLimits: (date, limits, strictValidation = false) => {
        const dateSplit = date.split("-") 
        date = parseInt(
            dateSplit[0].length === 4 
            ? `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}` 
            : `${dateSplit[2]}${dateSplit[1]}${dateSplit[0]}`
        )
        if(limits.max){
            const maxSplit = limits.max.split("-") 
            const max = parseInt(
                maxSplit[0].length === 4 
                ? `${maxSplit[0]}${maxSplit[1]}${maxSplit[2]}` 
                : `${maxSplit[2]}${maxSplit[1]}${maxSplit[0]}`
            )
            if(date > max) { return false }
        }
        if(strictValidation && limits.min){
            const minSplit = limits.min.split("-") 
            const min = parseInt(
                minSplit[0].length === 4 
                ? `${minSplit[0]}${minSplit[1]}${minSplit[2]}` 
                : `${minSplit[2]}${minSplit[1]}${minSplit[0]}`
            )
            if(date < min) { return false }
        }
        return true
    },

    /**
     * Checks length and format of string parameter
     * @memberof validation 
     * @param {string} string 
     * @param {string} stringName - accept dateInput, id or label 
     * @param {string} output - error box id
     * @param {object} limits - deadlines object  
     * @param {boolean} strictValidation - true : apply strict validation
     * @returns {boolean}
     */
    checkString: (string, stringName, output, limits, strictValidation = false) => {
        const stringLength = string.length
        const searchLetter = stringName === "date" || stringName === "dateTime" || stringName === "time" 
                            ? true : false
        if(limits && stringName === "date" && !validation.checkLimits(string, limits, strictValidation)){ 
            return validation.addError(stringName, "outOfBounds", output)
        }
        if(searchLetter && !strictValidation){
            if( /[a-zA-Z?,;!??%*$??&+_()\/]/.test(string) ){
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

    /**
     * Checks if type is allowed
     * @memberof validation 
     * @param {string} itemToCheck 
     * @param {string} itemName
     * @param {string} output - error box id
     * @returns {boolean} checkResult
     */
    checkType: (itemToCheck, itemName, output) => {
        if(typeof itemToCheck !== validation.allowedType[itemName]){
            return validation.addError(itemName, "wrongType", output)
        }
        return true
    },

    /**
     * clear error attribute and error message displayed
     * @memberof validation 
     */
    clearError: () => { validation.error = [] },

    formats: {

        /**
         * Provide expected formats as an object 
         * @memberof validation 
         * @param {string} type - accept date, time, ...
         * @param {string} outputFormat - corresponding to DatePicker parameter
         * @returns {object} formatObject
         */
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

        /**
         * Provide formats object 
         * @memberof validation 
         * @param {string} output 
         * @param {string} pattern 
         * @param {string} placeholder 
         * @param {string} regExp 
         * @param {object} expectedLenght 
         * @returns {object} formatsObject
         */
        getObject: (output, pattern, placeholder, regExp, expectedLenght) => { return { output, pattern, placeholder, regExp, expectedLenght }},
        
        /**
         * Provide options object 
         * @memberof validation 
         * @param {boolean} time 
         * @returns {object} optionsObject
         */
        getOptions: (time = false) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            return time ? { hour: 'numeric', minute: 'numeric', ...options } : options
        },

        /**
         * Store language defined to navigator 
         * @memberof validation 
         */
        lang: navigator.language.substring(0,2),

        /**
         * Stores functions to get input value correctly formatted 
         * @memberof validation 
         */
        output: {

            /**
             * Stores functions to get input value in array format
             */
            array: {

                /**
                 * Provide date in array format 
                 * @param {string} date 
                 * @returns {array} dateArray
                 * @example [ {number} year, {number} month, {number} day ]
                 */
                date: (date) => date && date.split(date.indexOf("-") > 0 ? "-" : "."), 
                
                /**
                 * Provide date time in array format 
                 * @param {string} dateTime 
                 * @returns {array} dateTimeArray
                 * @example [ {number} year, {number} month, {number} day, {number} hour, {number} minute ]
                 */
                dateTime: (dateTime) => {
                    if(dateTime){
                        const dateTimeArray = dateTime.split(" ") 
                        return  [ ...validation.formats.output.array.date(dateTimeArray[0]), ...validation.formats.output.array.time(dateTimeArray[1])] 
                    }
                },
                
                /**
                 * Provide time in array format 
                 * @param {string} time 
                 * @returns {array} timeArray
                 * @example [ {number} hour, {number} minute ]
                 */
                time: (time) => time && time.split(":"),
            },

            /**
             * Stores functions to get input value in object format
             */
            dateObject: {

                /**
                 * Provide date in object format 
                 * @param {string} date 
                 * @returns {object} Date
                 */
                date: (date) => date && validation.formats.output.dateObject.fct(date, "date"), 

                /**
                 * Provide dateTime in object format 
                 * @param {string} dateTime 
                 * @returns {object} Date
                 */
                dateTime: (dateTime) => dateTime && validation.formats.output.dateObject.fct(dateTime, "dateTime"),  

                /**
                 * Provide date in object format 
                 * @param {string} date 
                 * @param {string} type 
                 * @returns {object} Date
                 */
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

                /**
                 * Provide time in object format 
                 * @param {string} time 
                 * @returns {object} Date
                 */
                time: (time) => time && validation.formats.output.dateObject.fct(time, "time")
            },

            number: "number",

            /**
             * Stores functions to get input value in string format
             */
            string: { 

                /**
                 * Provide date in string format 
                 * @param {string} date 
                 * @returns {string} date
                 */
                date: (date) => date && validation.formats.output.string.fct(date, false),

                /**
                 * Provide dateTime in string format 
                 * @param {string} dateTime 
                 * @returns {string} dateTime
                 */
                dateTime: (date) => date && validation.formats.output.string.fct(date, true),   

                /**
                 * Provide date in string format 
                 * @param {string} date 
                 * @param {boolean} isDateTime 
                 * @returns {string} date
                 */
                fct: (date, isDateTime = false) => new Intl.DateTimeFormat(
                    undefined, 
                    validation.formats.getOptions(isDateTime)).format(
                        validation.formats.output.dateObject[isDateTime ? "dateTime" : "date"](date)
                    ),

                /**
                 * Provide time in string format 
                 * @param {string} time 
                 * @returns {string} time
                 */
                time: (date) => date && date.toLocalTimeString()
            }
        },

        /**
         * Stores input pattern corresponding to the expected format 
         * @memberof validation 
         */
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

        /**
         * Stores input placeholder corresponding to the expected format 
         * @memberof validation 
         */
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

        /**
         * Stores regExp parameter to control the expected format 
         * @memberof validation 
         */
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

    /**
     * Applies the test function of regExp
     * @memberof validation 
     * @param {string} string - value to check
     * @param {string} stringName 
     * @param {string} output 
     * @returns {boolean} testFunctionResult
     */
    regExpTest(string, stringName, output){
        const regVal = stringName === "id" ? ["^[a-zA-Z0-9-]+$", "g"] 
                    : stringName === "label" ? ["^[a-zA-Z0-9 -/']+$", "g"] 
                    : stringName === "color" ? ["^[rh#][a-zA-Z0-9]+$", "g"] 
                    : datePickerParams.format[output].regExp 
        const regEx = Array.isArray(regVal) ? new RegExp(regVal[0], regVal[1]) : new RegExp(regVal)
        return regEx.test(string)
    }

};