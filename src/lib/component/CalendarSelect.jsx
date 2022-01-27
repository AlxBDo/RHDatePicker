import React from "react"
import PropTypes from "prop-types"

import { CalendarBox, CalendarOption, DateSelect} from "../style"
import { datePickerParams } from "../utils/datePickerParams"

function getCalendarOption(item, index, baseId){
    return(
        <CalendarOption 
            key={`opt-${item.name}`} 
            id={datePickerParams.id[baseId][getSelectItemId(item.name)]} 
            tabIndex={index + 1}
            $name={item.name} 
            $type={item.type} 
        >
            {item.value && item.value}
        </CalendarOption>
    )
}

const getSpan = (textContent, tabindex) => <span key={`opt-${textContent}`} tabIndex={tabindex} >{textContent}</span> 

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

function CalendarSelect(props){

    const { baseId, name, list, onClickFunction, tabIndexStart } = props

    return typeof list[0] === "object" ? (
        <CalendarBox $name="option" onClick={onClickFunction}>
                { list.map((item, index) => getCalendarOption(item, index, baseId)) }
        </CalendarBox>
    ) : (
        <DateSelect $name={name} id={datePickerParams.id[baseId][`${name}Select`]} onClick={onClickFunction} >
            { list.map((item, index) => getSpan(Number.isInteger(item) ? item + index : item, tabIndexStart + index)) }
        </DateSelect>
    )
}

CalendarSelect.propTypes = {
    list : PropTypes.array.isRequired, 
    name: PropTypes.string.isRequired, 
    onClickFunction: PropTypes.func.isRequired
}

export default CalendarSelect