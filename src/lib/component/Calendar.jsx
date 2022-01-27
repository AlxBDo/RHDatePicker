import React from "react"
import { useDispatch, useSelector } from "react-redux"

import * as errorAction from "../features/error"
import { selectParams } from "../utils/selectors"
import * as paramsAction from "../features/params"
import * as selectedDateAction from "../features/selectedDate"
import { selectSelectedDate } from "../utils/selectors";
import Dialog from "./Dialog";
import CalendarSelect from "./CalendarSelect";
import { CalendarBox, CalendarList, CalendarListItem, CalendarModal, CalendarOption, DateSelect, style} from "../style"
import { datePickerParams } from "../utils/datePickerParams" 
import { calendar } from "../utils/calendar"
import { weekdays, months, getLimitYear, transformToNumber } from "../utils/date";
import { validation } from "../utils/validation";

const generateWeek = (index, startDay, monthLength, baseId) => {

    <CalendarListItem 
        key={`dayLi-${baseId}-${index}`} 
        id={`dayLi-${baseId}-${index}`}  
        tabIndex={index + 6}
        $type={(index < startDay || index > (monthLength + startDay - 1)) || ("clickable") }
    >{getNumberDay(index+1, monthLength, startDay)}</CalendarListItem>
}

const getNumberDay = (currentDay, monthLength, startDay) => (currentDay >= (startDay+1) && (currentDay - startDay) <= monthLength ) 
&& parseInt(currentDay - startDay)

function Calendar(props){
    const {baseId, displayBox} = props
    const dispatch = useDispatch() 
    const selectedDate = useSelector(selectSelectedDate(baseId))
    const calendarMonthSelected = parseInt(selectedDate.month)-1
    const date = new Date(selectedDate.year, calendarMonthSelected, 1)
    const startDay = date.getDay()
    const monthLength = months.getLength(calendarMonthSelected, selectedDate.year)
    const monthDays = Array(42).fill(1)
    const monthWeeks = Array(6).fill(1)
    const startYear = getLimitYear("min")
    const years = Array(100).fill(startYear)

    const calendarOptions = [
        { name: "previous-month", type: "icon" }, 
        { name: "home", type: "icon" }, 
        { name: "month", type: "select", value: months.name[calendarMonthSelected] }, 
        { name: "year", type: "select", value: selectedDate.year }, 
        { name: "next-month", type: "icon" }
    ]
    
    const click = {
        browseMonths: (month)=> month > 12 ? 1 : month < 1 ? 12 : month,
        days: (e) => click.fct(e, "Day"), 
        fct: (e, name) => {
            const value = parseInt(
                name === "Month" ? parseInt(months.name.indexOf(e.target.textContent)) + 1 
                : e.target.textContent
                ) 
            if(Number.isInteger(value)){
                dispatch(selectedDateAction[`set${name}`](value, baseId))
                if(name === "Day"){ 
                    dispatch(paramsAction.updateDisplay(datePickerParams.id[baseId].modal, false))
                    const dateToVerify = click.getFormattedValue(value)
                    document.getElementById(baseId).value = dateToVerify
                    datePickerParams.eventFunction.execute(baseId, dateToVerify, "onBlur")
                } else { click.moveDisplayBox() }
            }
        },
        getFormattedValue: (day) => {
            day = parseInt(day)
            const month = parseInt(selectedDate.month)
            const year = selectedDate.year
            switch(navigator.language){
                case "de": 
                    return day+"."+month+"."+year
                case "es": case "it":  
                    return day+"-"+month+"-"+year
                case "fr": 
                return transformToNumber(day)+"-"+transformToNumber(month)+"-"+year
                default: return year+"-"+transformToNumber(month)+"-"+transformToNumber(day)
            }
        },
        months: (e) => click.fct(e, "Month"),
        moveDisplayBox: (howMany = 0) => document.getElementById(datePickerParams.id[baseId].calendarDisplayBox).style.marginLeft = howMany+"px",
        optionSelect: (e) => {
            const item = e.target
            switch(item.getAttribute("id")){
                case datePickerParams.id[baseId].nextMonthBtn :
                    dispatch(selectedDateAction.setMonth(click.browseMonths(parseInt(selectedDate.month) + 1), baseId))
                    break
                case datePickerParams.id[baseId].prevMonthBtn : 
                dispatch(selectedDateAction.setMonth(click.browseMonths(parseInt(selectedDate.month) - 1), baseId))
                    break 
                case datePickerParams.id[baseId].selectedMonth : 
                    click.moveDisplayBox(-320)
                    break 
                case datePickerParams.id[baseId].selectedYear : 
                    click.moveDisplayBox(-635)
                    document.getElementById(datePickerParams.id[baseId].yearSelect).scroll(
                        0, (selectedDate.year - getLimitYear("min"))*8
                    )
                    break
                case datePickerParams.id[baseId].todayBtn : 
                    dispatch(selectedDateAction.init(baseId))
                    break
                default: return false
            }},
        years: (e) => click.fct(e, "Year")
    }

    function showCorrespondingWeekday(weekdayNumber, highlight = true){ 
        document.getElementById(`wd${baseId}-${weekdays[weekdayNumber]}`).style.opacity = highlight ? 1 : 0.5 
    }

    return(
        <Dialog 
            dialogBoxId={datePickerParams.id[baseId].modal} 
            htmlClass="hrnet-dp-modal" 
            displayBox={displayBox} 
            isModal={true} 
            color={style.color()} 
            backgroundColor={style.backgroundColor()} 
        >
            <CalendarSelect baseId={baseId} name="option" list={calendarOptions} onClickFunction={click.optionSelect} />
            <CalendarBox $name={`display`} id={datePickerParams.id[baseId].calendarDisplayBox}>
                <DateSelect $name={"days"} >
                    <CalendarList $name="weekdays">
                            { weekdays.map( (day) => (
                                <CalendarListItem key={`wd-${baseId}-${day}`} id={`wd${baseId}-${day}`}>{day}</CalendarListItem>
                            ))}
                    </CalendarList>
                    <CalendarList $name="month-days" onClick={click.days}>
                        {monthDays.map((day, index)=> (
                            <CalendarListItem 
                                key={`dayLi-${baseId}-${index}`} 
                                id={`dayLi-${baseId}-${index}`}  
                                tabIndex={index + 6}
                                $type={(index < startDay || index > (monthLength + startDay - 1)) ? ("empty-cell") : ("clickable") }
                                onMouseOver={() => { showCorrespondingWeekday( (index) - (parseInt(index/7)*7) )}}
                                onMouseOut={() => { showCorrespondingWeekday( (index) - (parseInt(index/7)*7), false )}}
                            >{getNumberDay(index+1, monthLength, startDay)}</CalendarListItem>
                        ))}
                    </CalendarList>
                </DateSelect>
                <CalendarSelect tabIndexStart={48} baseId={baseId} name={"month"} list={months.name} onClickFunction={click.months} />
                <CalendarSelect tabIndexStart={61} baseId={baseId} name={"year"} list={years} onClickFunction={click.years} />
            </CalendarBox>
        </Dialog>
    )

}

export default Calendar