import { validation } from "./validation"
import { style } from "../style"

const getIsDefaultObject = (isDate, isDateTime, isPeriod, isTime) => { return { 
    date: isDate, dateTime: isDateTime, period: isPeriod, time: isTime }}

export const datePickerParams = {

    /**
     * store id
     */
    id : {},

    is: {},

    deadlines: {},

    /**
     * store a new id
     * @param {string} name 
     * @param {string} value 
     */
    addId: (baseId, idObject) => datePickerParams.id[baseId] = idObject,

    eventFunction: {
        execute: (baseId, value, eventFunctionName) => {
            validation.clearError()
            const valueLength = value.length
            const type = datePickerParams.format[baseId].type.indexOf("date") >= 0 
                        ? datePickerParams.format[baseId].type.indexOf("ime") >= 0 
                        ? "dateTime" : "date" : "time"
            const expectedLenght = validation.allowedLength[type].min
            if(eventFunctionName === "onChange" && valueLength < expectedLenght){
                value && validation.checkInputValue(value, baseId, type, datePickerParams.deadlines[baseId])
                value = false
            } else if(valueLength >= expectedLenght || (eventFunctionName === "onBlur" && valueLength > 0)){
                value = datePickerParams.format[baseId].output !== "number"
                    ? datePickerParams.format[baseId].output(validation.checkInputValue(
                        value, 
                        baseId, 
                        type, 
                        datePickerParams.deadlines[baseId], 
                        true
                    )) : validation.checkInputValue(value, baseId, type, datePickerParams.deadlines[baseId], true)
            } else { value = false }
            datePickerParams.eventFunction[baseId][eventFunctionName] 
            && datePickerParams.eventFunction[baseId][eventFunctionName](value)
        }
    },

    format: {},

    getTimeSelectId: (baseId, selectName, startOrEnd = false) => {
        return datePickerParams.id[baseId][`${selectName}${startOrEnd ? startOrEnd.substring(0,1).toUpperCase() + startOrEnd.substring(1) : ""}Select`]
    },

    htmlClass: {},

    label: {},
    
    /**
     * initializes the attributes containing the component parameters
     * @param {string} inputId 
     * @param {string} label 
     * @param {object} eventFunction 
     * @param {object} htmlClass 
     */
    initComponentParams: (inputId, label, deadlines, eventFunction, htmlClass, dateFormat, type, calendarColor = false) => {
        if(!datePickerParams.is[inputId]){
            const indexTime = type.indexOf("ime")
            const isTime = indexTime > 0
            const isDateTime = isTime && indexTime !== 1 ? true : false
            datePickerParams.is[inputId] = getIsDefaultObject(
                type.indexOf("date") === 0, 
                isDateTime, 
                type.indexOf("Period") > 3, 
                isTime
            )
        }
        datePickerParams.initIdHtml(inputId, datePickerParams.is[inputId].period) 
        datePickerParams.setLabel(inputId, label)
        datePickerParams.deadlines[inputId] = deadlines
        datePickerParams.setEventFunction(inputId, eventFunction) 
        datePickerParams.setHtmlClass(inputId, htmlClass)
        datePickerParams.format[inputId] = { type, ...validation.formats.get(
            datePickerParams.is[inputId].dateTime ? "dateTime" : datePickerParams.is[inputId].date ? "date" : "time", 
            dateFormat)}
        if(!style.colors.dark){
            style.setColors(
                validation.checkColor(calendarColor.dark, inputId), 
                validation.checkColor(calendarColor.light, inputId),
                calendarColor.advice && validation.checkColor(calendarColor.advice, inputId),
                calendarColor.error && validation.checkColor(calendarColor.error, inputId)
            )
        }
    },

    /**
     * initializes the html ids necessary for the operation of the component
     */
    initIdHtml: (baseId, isPeriod) => {
        const timeId = isPeriod ? {
            hoursStartSelect: baseId + "-start-hours-select",
            minutesDecStartSelect: baseId + "-start-minutesdec-select",
            minutesUniStartSelect: baseId + "-start-minutesuni-select",
            hoursEndSelect: baseId + "-end-hours-select",
            minutesDecEndSelect: baseId + "-end-minutesdec-select",
            minutesUniEndSelect: baseId + "-end-minutesuni-select"
        } : {
            hoursSelect: baseId + "-hours-select",
            minutesDecSelect: baseId + "-minutesdec-select",
            minutesUniSelect: baseId + "-minutesuni-select"
        }
        datePickerParams.addId(
            baseId, 
            {
                calendarDisplayBox: baseId + "-display-box",
                daySelect: baseId + "-day-select",
                modal: baseId + "-calendar-modal",
                monthSelect: baseId + "-month-select",
                monthSelectOpt: baseId + "-month-opt-",
                nextMonthBtn: baseId + "-next-month",
                prevMonthBtn: baseId + "-prev-month",
                selectedMonth: baseId + "-selected-month",
                selectedYear: baseId + "-selected-year",
                yearSelect: baseId + "-year-select",
                todayBtn: baseId + "-today", 
                ...timeId
            }
        )
    },

    /**
     * execute the functions corresponding to the eventName parameter
     * @param {event} e 
     * @param {string} eventName 
     */
    listen: (e, eventName, baseId) => datePickerParams.eventFunction.execute(baseId, e.target.value, eventName),

    /**
     * check and store the event functions passed as a parameter of the DatePicker component
     * @param {object} eventFunction 
     */
    setEventFunction: (baseId, eventFunction) => { 
        if(typeof eventFunction === "object"){ 
            if(eventFunction.onBlur && !validation.checkType(
                eventFunction.onBlur, "eventFunction", baseId
            )){ return false }
            if(eventFunction.onChange && !validation.checkType(
                eventFunction.onChange, "eventFunction", baseId
            )){ return false }
            if(eventFunction.onClick && !validation.checkType(
                eventFunction.onClick, "eventFunction", baseId
            )){ return false }
            datePickerParams.eventFunction[baseId] = eventFunction
        }
    },
 
    /**
     * check and store html class passed as a parameter of the DatePicker component
     * @param {object} htmlClass 
     */
    setHtmlClass: (baseId, htmlClass) => { if(typeof htmlClass === "object"){ datePickerParams.htmlClass[baseId] = htmlClass }},

    /**
     * check and store the input id passed as a parameter of the DatePicker component
     * @param {string} id 
     */
    setInputId(id){ this.id.input = validation.checkId(id, "paramError") ? id : "paramError" },    

    /**
     * check and store the input label passed as a parameter of the DatePicker component
     * @param {string} label 
     */
    setLabel: (baseId, label) => { if(validation.checkLabel(label, baseId)){ datePickerParams.label[baseId] = label} },

}