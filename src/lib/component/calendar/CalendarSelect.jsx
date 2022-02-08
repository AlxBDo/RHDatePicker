import React from "react"
import PropTypes from "prop-types"

import { CalendarBox, CalendarOption, DateSelect} from "../../style"
import { datePickerParams } from "../../utils/datePickerParams"

/**
 * Provides span option for CalendarBox list
 * @param {object} item 
 * @param {string} baseId - date picker input id
 * @returns {object} span html element
 */
function getCalendarOption(item, baseId){
    return(
        <CalendarOption 
            key={`${baseId}-opt-${item.name}`} 
            id={datePickerParams.id[baseId][getSelectItemId(item.name)]}
            $name={item.name} 
            $type={item.type} 
        >
            {item.value && item.value}
        </CalendarOption>
    )
}

/**
 * Provides span option for Calendar Select list
 * @param {string | number} textContent 
 * @param {string} id 
 * @param {boolean} isSelected 
 * @param {function} spanOnClickFunction 
 * @returns {object} span html element
 */
const getSpan = (textContent, id, isSelected = false, spanOnClickFunction = false) => <span 
                                                            key={`opt-${id}-${textContent}`} 
                                                            id={id} 
                                                            className={isSelected ? "selected-option" : null} 
                                                            onClick={spanOnClickFunction ? spanOnClickFunction : null}
                                                        >{textContent}</span> 
/**
 * Corrects the value passed in parameter if it does not respect the minimum and maximum values
 * @param {number} value 
 * @param {number} maxValue 
 * @param {number} minValue 
 * @returns {number}
 */ 
function getSpanValue(value, maxValue, minValue){
    return value > maxValue ? value - (maxValue+1) 
        : value < minValue ? value + maxValue + 1 
        : value
}

/**
 * Provide the id of the html select tag
 * @param {string} name 
 * @returns {string}
 */
function getSelectItemId(name){
    switch(name){
        case "home": return "todayBtn" 
        case "month": return "selectedMonth" 
        case "next-month": return "nextMonthBtn" 
        case "previous-month": return "prevMonthBtn" 
        case "year": return "selectedYear" 
        default: return false                   
    }
}

/**
 * Scrolls through list values - onClick
 * @param {string} moreOrLess - if receive "more" increment the value of the list else do a decrement
 * @param {string} id 
 * @param {array} list 
 * @param {number} maxValue 
 * @param {number} minValue 
 */
function moveDateSelectList(moreOrLess, id, list, maxValue, minValue = 0){
    updateDateSelectList(id, list, maxValue, minValue, 
        moreOrLess === "more" 
        ? parseInt(document.querySelector(`div#${id} .selected-option`).textContent) - (parseInt(list.length / 2)-1) 
        :  parseInt(document.querySelector(`div#${id} .selected-option`).textContent) - (parseInt(list.length / 2)+1)
    )
}

/**
 * Scrolls through list values - onWheel
 * @param {object} e - event
 * @param {string} id 
 * @param {array} list 
 * @param {number} maxValue 
 * @param {number} minValue 
 */
function onWheelFunction(e, id, list, maxValue, minValue = 0){
    const selectedValue = parseInt(document.querySelector(`div#${id} .selected-option`).textContent)
    const startValue = getSpanValue(
        e.deltaY > 0 ? (selectedValue + 1) - parseInt(list.length / 2) : (selectedValue - 1) - parseInt(list.length / 2), 
        maxValue, 
        minValue
    )
    updateDateSelectList(id, list, maxValue, minValue, startValue)
}

/**
 * modify span value of CalendarSelect
 * @param {string} id 
 * @param {array} list 
 * @param {number} maxValue 
 * @param {number} minValue 
 * @param {number} startValue 
 */
function updateDateSelectList(id, list, maxValue, minValue, startValue){
    list.map((item, index) => {
        document.getElementById(`${id}-option-${index}`).textContent =  getSpanValue(startValue + index, maxValue, minValue)
    })
}

/**
 * Display Calendar select
 * @component
 * @param {object} props 
 * @param {string} props.baseId - date picker input id
 * @param {string} props.className 
 * @param {array} props.list - list of values ​​or objects used to create the select
 * @param {number} props.maxValue - maximum value that the select can display
 * @param {number} props.minValue - minimum value that the select can display
 * @param {string} props.name
 * @param {object} props.onClickFunction - function apply to select 
 * @param {number} props.selectedValue - value display as selected
 * @param {function} props.spanOnClickFunction - function apply to option select    
 * @returns {object} 
 */ 
function CalendarSelect(props){

    const { baseId, className, list, maxValue, minValue, name, onClickFunction, selectedValue, spanOnClickFunction } = props
    const elementId = datePickerParams.id[baseId][`${name}Select`]
    
    /**
     * change selected value of select
     * @param {object} e - event
     */
    const updateDateSelectOnClickSpan = (e) => {
        e.stopPropagation()
        updateDateSelectList(elementId, list, maxValue, minValue, parseInt(e.target.textContent) - parseInt(list.length / 2))
    }

    return typeof list[0] === "object" ? (
        <CalendarBox $name="option" onClick={onClickFunction}>
                { list.map((item) => getCalendarOption(item, baseId)) }
        </CalendarBox>
    ) : (
        <DateSelect 
            $name={name} 
            id={elementId} 
            onClick={onClickFunction} 
            onWheel={ (e) => maxValue && onWheelFunction(e, elementId, list, maxValue, minValue)} 
            className={className}
        >
            { spanOnClickFunction && ( 
                <CalendarOption 
                    id={`${elementId}-less-btn`} 
                    $name={`less`} 
                    $type={"move-icon"} 
                    onClick={() => moveDateSelectList("less", elementId, list, maxValue, minValue)}
                />
            )}
            { list.map((item, index) => getSpan(
                getSpanValue(Number.isInteger(item) ? item + index : item, maxValue, minValue), 
                `${elementId}-option-${index}`, 
                selectedValue === item + index && true, 
                spanOnClickFunction && updateDateSelectOnClickSpan
            )) }
            { spanOnClickFunction && ( 
                <CalendarOption 
                    id={`${elementId}-more-btn`} 
                    $name={`more`} 
                    $type={"move-icon"} 
                    onClick={() => moveDateSelectList("more", elementId, list, maxValue, minValue)}
                /> 
            )}
        </DateSelect>
    )
}

CalendarSelect.defaultProp = {
    className: null,
    maxValue: false, 
    minValue: 0,
    selectedValue: false, 
    spanOnClickFunction: false
}

CalendarSelect.propTypes = {
    baseId: PropTypes.string,
    className: PropTypes.string,
    list : PropTypes.array.isRequired, 
    maxValue: PropTypes.number, 
    minValue: PropTypes.number,
    name: PropTypes.string.isRequired, 
    onClickFunction: PropTypes.func.isRequired,
    selectedValue: PropTypes.number, 
    spanOnClickFunction: PropTypes.bool
}

export default CalendarSelect