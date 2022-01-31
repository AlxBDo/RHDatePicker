import React, { useEffect, useState } from "react" 
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { datePickerParams } from "../utils/datePickerParams"
import { validation } from "../utils/validation" 
import { calendar } from "../utils/calendar"
import { DatePickerContainer } from "../style"
import Dialog from "./Dialog"
import Error from "./Error"
import Calendar from "./Calendar"
import { selectError } from "../utils/selectors"
import * as errorAction from "../features/error"
import { selectParams } from "../utils/selectors"
import * as paramsAction from "../features/params"
import { selectSelectedDate } from "../utils/selectors" 
import * as selectedDateAction from "../features/selectedDate"

/**
 * Check and display input type date
 * @param {object} param - object containing attributes: inputId, label, evenFunction (optional) and htmlClass (optional)
 * @example { inputId: "my-input-id", label: "My input id label", evenFunction: {}, htmlClass: {} }
 * @param {string} param.inputId - accepts alphanumeric characters and hyphen
 * @param {string} param.label - accepts alphanumeric characters, hyphen, space and apostrophe
 * @param {object} param.eventFunction - contains function to apply to events
 * @example { onBlur: onBlurFunction, onChange: onChangeFunction, onClick: onClickFunction }
 * @param {object} param.htmlClass - contains classes to apply to the container, to the input and to the error message
 * @example { container: "container-class", input: "input-class", error: "error-class" }
 * @returns {object}
 */
const DatePicker = (props) => {

    const {
        inputId, 
        label,
        eventFunction = {},
        htmlClass = {}, 
        valueFormat, 
        colors, 
        type
    } = props

    const baseId = validation.checkId(inputId, "paramError") ? inputId : "paramError"
    datePickerParams.initComponentParams(baseId, label, eventFunction, htmlClass, valueFormat, type, colors)

    const dispatch = useDispatch()
    const params = useSelector(selectParams())
    const selectedDate = useSelector(selectSelectedDate(baseId))
    dispatch(errorAction.getErrors(baseId))
    
    if(baseId !== "paramError" && datePickerParams.label[baseId]){
        if(!params.checked.includes(inputId)){ 
            dispatch(paramsAction.init(inputId)) 
            dispatch(paramsAction.setDisplay(datePickerParams.id[baseId].modal, false))
        } 
        if(selectedDate.status === "default" && !selectedDate.day) {
            dispatch(selectedDateAction.init(baseId, type))
        }
    }

    const eventFunctionHandler = {
        paramsFunction : (e, eventName) => {
            dispatch(errorAction.clear(baseId))
            datePickerParams.listen(e, eventName, baseId)
            dispatch(errorAction.getErrors(baseId))
        }, 
        blur: (e) => eventFunctionHandler.paramsFunction(e, "onBlur"), 
        change: (e) => eventFunctionHandler.paramsFunction(e, "onChange"), 
        click: (e) => {
            e.preventDefault()
            dispatch(paramsAction.updateDisplay(datePickerParams.id[baseId].modal, true))
            eventFunctionHandler.paramsFunction(e, "onClick")
            if(e.target.getAttribute("id") === baseId){ e.target.focus() }
        }, 
    }
    
    return(
        <DatePickerContainer>
            { (baseId !== "paramError" && datePickerParams.label[baseId]) && (
                <div className={ datePickerParams.htmlClass[baseId].container && datePickerParams.htmlClass[baseId].container }>
                    <label htmlFor={baseId}>{datePickerParams.label[baseId]}</label> 
                    <input 
                        type="text" 
                        id={baseId} 
                        name={baseId} 
                        pattern={datePickerParams.format[baseId].pattern} 
                        placeholder={datePickerParams.format[baseId].placeholder}
                        className={ datePickerParams.htmlClass[baseId].input && (`${datePickerParams.htmlClass[baseId].input}`) }
                        onChange={ eventFunctionHandler.change }
                        onClick={ eventFunctionHandler.click }
                        onBlur={ eventFunctionHandler.blur } 
                        tabIndex={0}
                        required 
                    />
                    <Calendar baseId={baseId} displayBox={params.display[datePickerParams.id[baseId].modal]} type={type} />
                </div>
            ) }
            <Error 
                dialogBoxId={baseId} 
                htmlClass={datePickerParams.htmlClass[baseId].error && datePickerParams.htmlClass[baseId].error}
            />
        </DatePickerContainer>
    )

}

DatePicker.defaultProps = {
    valueFormat: "number", 
    colors: { dark: "#302f2f", light: "#f2f2ef"},
    type: "dateTime"
}

DatePicker.propTypes = {
    inputId: PropTypes.string.isRequired, 
    label: PropTypes.string.isRequired, 
    eventFunction: PropTypes.object, 
    htmlClass: PropTypes.object, 
    valueFormat: PropTypes.string, 
    colors: PropTypes.object,
    type: PropTypes.string
}

export default DatePicker