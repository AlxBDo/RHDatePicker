import React from "react"
import PropTypes from "prop-types"

import { CalendarBox, CalendarOption, DateSelect} from "../style"
import { datePickerParams } from "../utils/datePickerParams"

function getCalendarOption(item, index, baseId){
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

const getSpan = (textContent, id, isSelected = false, spanOnClickFunction = false) => <span 
                                                            key={`opt-${id}-${textContent}`} 
                                                            id={id} 
                                                            className={isSelected ? "selected-option" : null} 
                                                            onClick={spanOnClickFunction ? spanOnClickFunction : null}
                                                        >{textContent}</span> 
 
function getSpanValue(value, maxValue, minValue){
    return value > maxValue ? value - (maxValue+1) 
        : value < minValue ? value + maxValue + 1 
        : value
}

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

function moveDateSelectList(moreOrLess, id, list, maxValue, minValue = 0){
    updateDateSelectList(id, list, maxValue, minValue, 
        moreOrLess === "more" 
        ? parseInt(document.querySelector(`div#${id} .selected-option`).textContent) - 2 
        :  parseInt(document.querySelector(`div#${id} .selected-option`).textContent) - 4
    )
}

function onWheelFunction(e, id, list, maxValue, minValue = 0){
    const selectedValue = parseInt(document.querySelector(`div#${id} .selected-option`).textContent)
    const startValue = getSpanValue(
        e.deltaY > 0 ? (selectedValue + 1) - parseInt(list.length / 2) : (selectedValue - 1) - parseInt(list.length / 2), 
        maxValue, 
        minValue
    )
    updateDateSelectList(id, list, maxValue, minValue, startValue)
}

function updateDateSelectList(id, list, maxValue, minValue, startValue){
    list.map((item, index) => {
        document.getElementById(`${id}-option-${index}`).textContent =  getSpanValue(startValue + index, maxValue, minValue)
    })
}

function CalendarSelect(props){

    const { baseId, className, list, maxValue, minValue, name, onClickFunction, selectedValue, spanOnClickFunction } = props
    const elementId = datePickerParams.id[baseId][`${name}Select`]

    const updateDateSelectOnClickSpan = (e) => updateDateSelectList(elementId, list, maxValue, minValue, parseInt(e.target.textContent)-3)

    return typeof list[0] === "object" ? (
        <CalendarBox $name="option" onClick={onClickFunction}>
                { list.map((item, index) => getCalendarOption(item, index, baseId)) }
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
                    $name={`more`} 
                    $type={"move-icon"} 
                    onClick={() => moveDateSelectList("more", elementId, list, maxValue, minValue)}
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
                    $name={`less`} 
                    $type={"move-icon"} 
                    onClick={() => moveDateSelectList("less", elementId, list, maxValue, minValue)}
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
    list : PropTypes.array.isRequired, 
    name: PropTypes.string.isRequired, 
    onClickFunction: PropTypes.func.isRequired
}

export default CalendarSelect