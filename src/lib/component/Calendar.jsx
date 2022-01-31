import React from "react"
import { useDispatch, useSelector } from "react-redux"

import * as paramsAction from "../features/params"
import * as selectedDateAction from "../features/selectedDate"
import { selectSelectedDate } from "../utils/selectors";
import Dialog from "./Dialog";
import CalendarSelect from "./CalendarSelect";
import TimeSelect from "./TimeSelect"
import { CalendarBox, CalendarList, CalendarListItem, CalendarOption, CalendarSection, DateSelect, style } from "../style"
import { datePickerParams } from "../utils/datePickerParams"
import { weekdays, months, getLimitYear, transformToNumber } from "../utils/date";

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
            let value = name === "Month" ? parseInt(months.name.indexOf(e.target.textContent)) + 1 
                        : parseInt(e.target.textContent) 
            if(Number.isInteger(value)){
                if(name === "Minute"){
                    value = parseInt(
                        e.target.getAttribute("id").indexOf("minutesuni") > 0
                        ? String(document.querySelector(
                            `div#${datePickerParams.id[baseId].minutesDecSelect} .selected-option`).textContent) 
                        + value : value 
                        + String(document.querySelector(
                            `div#${datePickerParams.id[baseId].minutesUniSelect} .selected-option`).textContent)
                    )
                }
                dispatch(selectedDateAction[`set${name}`](value, baseId))
                if(name === "Day"){ 
                    dispatch(paramsAction.updateDisplay(datePickerParams.id[baseId].modal, false))
                    let time = false 
                    if(selectedDate.type.indexOf("ime") > 0){
                        const hour = parseInt(document.querySelector(`div#${datePickerParams.id[baseId].hoursSelect} .selected-option`).textContent)
                        if(transformToNumber(hour) !== selectedDate.hour){ dispatch(selectedDateAction.setHour(hour, baseId)) }
                        const minutes = String(document.querySelector(`div#${datePickerParams.id[baseId].minutesDecSelect} .selected-option`).textContent) 
                                    + String(document.querySelector(`div#${datePickerParams.id[baseId].minutesUniSelect} .selected-option`).textContent)
                        if(transformToNumber(minutes) !== selectedDate.minute){ dispatch(selectedDateAction.setMinute(minutes, baseId)) }
                        time = transformToNumber(hour) + ":" + minutes
                    }
                    const dateToVerify = click.getFormattedValue(value, time)
                    document.getElementById(baseId).value = dateToVerify
                    datePickerParams.eventFunction.execute(baseId, dateToVerify, "onBlur")
                } else { click.show(datePickerParams.id[baseId].daySelect, baseId) }
            }
        },
        getFormattedValue: (day, time = false) => {
            day = parseInt(day)
            const month = parseInt(selectedDate.month)
            const year = selectedDate.year
            let date = false
            switch(navigator.language){
                case "de": 
                    date = day+"."+month+"."+year 
                    break 
                case "es": case "it":  
                    date = day+"-"+month+"-"+year 
                    break 
                case "fr": 
                    date = transformToNumber(day)+"-"+transformToNumber(month)+"-"+year  
                    break 
                default: 
                    date = year+"-"+transformToNumber(month)+"-"+transformToNumber(day)
            }
            return time ? date + " " + time : date 
        },
        hour: (e) => click.fct(e, "Hour"),
        minute: (e) => click.fct(e, "Minute"),
        months: (e) => click.fct(e, "Month"),
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
                    click.show(datePickerParams.id[baseId].monthSelect, baseId)
                    break 
                case datePickerParams.id[baseId].selectedYear : 
                    click.show(datePickerParams.id[baseId].yearSelect, baseId)
                    document.getElementById(datePickerParams.id[baseId].yearSelect).scroll(
                        0, (selectedDate.year - getLimitYear("min"))*8
                    )
                    break
                case datePickerParams.id[baseId].todayBtn : 
                    dispatch(selectedDateAction.init(baseId, selectedDate.type))
                    break
                default: return false
            }},
        show: (elementId, baseId) => {
            document.querySelector(`#${datePickerParams.id[baseId].modal} .show`).classList.remove("show")
            document.getElementById(elementId).classList.add("show")
        },
        years: (e) => click.fct(e, "Year")
    }

    function showCorrespondingWeekday(weekdayNumber, highlight = true){ 
        document.getElementById(`wd${baseId}-${weekdays[weekdayNumber]}`).style.opacity = highlight ? 1 : 0.5 
        document.getElementById(`wd${baseId}-${weekdays[weekdayNumber]}`).style.borderBottom = highlight ? "1px solid" : "none" 
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
            {(selectedDate.type !== "time" && selectedDate.type !== "timePeriod") && (
                <CalendarSection>
                    <CalendarSelect baseId={baseId} name="option" list={calendarOptions} onClickFunction={click.optionSelect} />
                    <CalendarBox $name={`display`} id={datePickerParams.id[baseId].calendarDisplayBox} className="date-ctn">
                        <DateSelect $name={"days"} className="show" id={datePickerParams.id[baseId].daySelect}>
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
                                        $type={(index < startDay || index > (monthLength + startDay - 1)) ? ("empty-cell") : ("clickable") }
                                        onMouseOver={() => { showCorrespondingWeekday( (index) - (parseInt(index/7)*7) )}}
                                        onMouseOut={() => { showCorrespondingWeekday( (index) - (parseInt(index/7)*7), false )}}
                                    >{getNumberDay(index+1, monthLength, startDay)}</CalendarListItem>
                                ))}
                            </CalendarList>
                        </DateSelect>
                        <CalendarSelect baseId={baseId} name={"month"} list={months.name} onClickFunction={click.months} />
                        <CalendarSelect baseId={baseId} name={"year"} list={years} onClickFunction={click.years} />
                    </CalendarBox>
                </CalendarSection>
            )}
            {(selectedDate.type !== "date" && selectedDate.type !== "datePeriod") && (
                <CalendarSection $flexDirection="row" $name="timeSection">
                    <TimeSelect 
                        baseId={baseId} 
                        maxValue={23} 
                        name="hours" 
                        selectedValue={parseInt(selectedDate.hour)} 
                        onClickFunction={click.hour}
                    />
                    <div>
                        <TimeSelect 
                            baseId={baseId} 
                            maxValue={5} 
                            name="minutesDec" 
                            selectedValue={parseInt(selectedDate.minute.substring(1))} 
                            onClickFunction={click.minute}
                        />
                        <TimeSelect 
                            baseId={baseId} 
                            name="minutesUni" 
                            selectedValue={parseInt(selectedDate.minute.substring(0, 1))} 
                            onClickFunction={click.minute} 
                        />
                    </div>
                </CalendarSection>
            )}
        </Dialog>
    )

}

export default Calendar