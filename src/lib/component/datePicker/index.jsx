import React, { useEffect } from "react" 
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { datePickerParams } from "../../utils/datePickerParams"
import { validation } from "../../utils/validation" 
import { DatePickerContainer, DatePickerInput, style } from "../../style"
import Error from "../error"
import Calendar from "../calendar"
import * as errorAction from "../../features/error"
import { selectParams } from "../../utils/selectors"
import * as paramsAction from "../../features/params"
import { selectSelectedDate } from "../../utils/selectors" 
import * as selectedDateAction from "../../features/selectedDate"

/**
 * Display label, input and calendar. Controls input format and formats output value. 
 * @component 
 * @param {object} props - object containing attributes: inputId, label, evenFunction (optional) and htmlClass (optional)
 * @param {string} props.inputId - accepts alphanumeric characters and hyphen 
 * @param {object} props.deadlines - contains min and max attributes
 * @example `deadlines = { max: 2022-02-22, min: 1940-06-18 }`
 * @param {string} props.label - accepts alphanumeric characters, hyphen, space and apostrophe
 * @param {object} props.eventFunction - contains function to apply to events
 * @example `eventFunction = { onBlur: onBlurFunction, onChange: onChangeFunction, onClick: onClickFunction }`
 * @param {object} props.htmlClass - contains classes to apply to the container, to the input and to the error message
 * @example `htmlClass = { container: "container-class", input: "input-class", error: "error-class" }`
 * @param {string} props.valueFormat - output format of DatePicker input value - Accept : "array", "dateObject" = Date(), "number", "string"
 * @param {string} props.type - define input type to generate - Accept : "date", "datePeriod", "dateTime", "dateTimePeriod", "time", "timePeriod"
 * @param {object} props.colors - define colors used by component
 * @example `colors = { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E"}`  
 * @returns {object}
 */
const DatePicker = (props) => {

    const { inputId, label, deadlines, eventFunction = {}, htmlClass = {}, valueFormat, colors, type } = props

    const baseId = validation.checkId(inputId, "paramError") ? inputId : "paramError"
    datePickerParams.initComponentParams(baseId, label, deadlines, eventFunction, htmlClass, valueFormat, type, colors)
    const dispatch = useDispatch()
    const params = useSelector(selectParams())
    const selectedDate = useSelector(selectSelectedDate(baseId))
    
    if(baseId !== "paramError" && datePickerParams.label[baseId]){
        if(!params.checked.includes(inputId)){ 
            dispatch(paramsAction.init(inputId)) 
            dispatch(paramsAction.setDisplay(datePickerParams.id[baseId].modal, false))
        } 
        if(selectedDate.status === "default" && !selectedDate.day) {
            dispatch(selectedDateAction.init(baseId, type))
        }
    }

    /**
     * contains the functions to be executed following the events
     */
    const eventFunctionHandler = {

        /**
         * Executes the functions provided by the eventFunction parameter of the DatePicker component 
         * as well as those for controlling the format of the input value
         * @method 
         * @memberof eventFunctionHandler
         * @param {object} e - event 
         * @param {string} eventName - accept onBlur, onChange or onClick 
         */
        paramsFunction : (e, eventName) => {
            dispatch(errorAction.clear(baseId))
            datePickerParams.listen(e, eventName, baseId)
            dispatch(errorAction.getErrors(baseId))
        },

        /**
         * Provide the function to execute at the onBlur event
         * @method 
         * @memberof eventFunctionHandler
         * @param {object} e - event
         */
        blur: (e) => eventFunctionHandler.paramsFunction(e, "onBlur"), 
        
        /**
         * Provide the function to execute at the onChange event
         * @method 
         * @memberof eventFunctionHandler
         * @param {object} e - event
         */
        change: (e) => eventFunctionHandler.paramsFunction(e, "onChange"), 
        
        /**
         * Provide the function to execute at the onClick event
         * @method 
         * @memberof eventFunctionHandler
         * @param {object} e - event
         */
        click: (e) => {
            e.preventDefault()
            dispatch(paramsAction.updateDisplay(datePickerParams.id[baseId].modal, true))
            eventFunctionHandler.paramsFunction(e, "onClick")
        },

    }

    useEffect( () => {
        dispatch(errorAction.getErrors(baseId))
    }, [])
    
    return(
        <DatePickerContainer>
            { (baseId !== "paramError" && datePickerParams.label[baseId]) && (
                <div className={ datePickerParams.htmlClass[baseId].container && datePickerParams.htmlClass[baseId].container }>
                    <label role={"label"} htmlFor={baseId}>{datePickerParams.label[baseId]}</label> 
                    <div className="date-picker-input">
                        <DatePickerInput 
                            type="text"
                            data-testid="date-picker-input" 
                            id={baseId} 
                            name={baseId} 
                            pattern={datePickerParams.format[baseId].pattern} 
                            placeholder={datePickerParams.format[baseId].placeholder}
                            className={ datePickerParams.htmlClass[baseId].input && (`${datePickerParams.htmlClass[baseId].input}`) }
                            onChange={ eventFunctionHandler.change }
                            onClick={ eventFunctionHandler.click }
                            onBlur={ eventFunctionHandler.blur }
                            $long={datePickerParams.is[baseId].dateTime}
                            $color={style.color()}
                            $backgroundColor={style.backgroundColor()}
                            required 
                        />
                        <Calendar 
                            baseId={baseId}
                            displayBox={params.display[datePickerParams.id[baseId].modal]} 
                            type={type} 
                        />
                        { datePickerParams.is[baseId].period && (
                            <DatePickerInput 
                                type="text" 
                                id={`${baseId}-end`} 
                                name={`${baseId}-end`} 
                                pattern={datePickerParams.format[baseId].pattern} 
                                placeholder={datePickerParams.format[baseId].placeholder}
                                className={ datePickerParams.htmlClass[baseId].input && (`${datePickerParams.htmlClass[baseId].input}`) }
                                onChange={ eventFunctionHandler.change }
                                onClick={ eventFunctionHandler.click }
                                onBlur={ eventFunctionHandler.blur }
                                $long={datePickerParams.is[baseId].dateTime}
                                $color={style.color()}
                                $backgroundColor={style.backgroundColor()}
                                required 
                            />
                        ) }
                    </div>
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
    deadlines: PropTypes.object, 
    eventFunction: PropTypes.object, 
    htmlClass: PropTypes.object, 
    valueFormat: PropTypes.string, 
    colors: PropTypes.object,
    type: PropTypes.string
}

export default DatePicker