import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import * as paramsAction from "../../features/params"
import * as selectedDateAction from "../../features/selectedDate"
import * as errorAction from "../../features/error"
import { selectSelectedDate } from "../../utils/selectors";
import Dialog from "../dialog";
import CalendarSelect from "./CalendarSelect";
import TimeSelect from "./TimeSelect"
import { CalendarBox, CalendarList, CalendarListItem, CalendarSection, DateSelect, style } from "../../style"
import { datePickerParams } from "../../utils/datePickerParams"
import { weekdays, months, getLimitYear, transformToNumber, currentDate } from "../../utils/date";
import { validation } from "../../utils/validation";

/**
 * iterates over elements with class selected-day and removes it
 * @function 
 */
const deleteSelectedDay = () => document.querySelectorAll(".selected-day").forEach((element) => { element.classList.remove("selected-day") })

/**
 * Checks that the current day, passed as a parameter, is included in the number of days of the month. Otherwise fix it
 * @function 
 * @param {number} currentDay 
 * @param {number} monthLength 
 * @param {number} startDay 
 * @returns {number} dayNumber
 */
const getNumberDay = (currentDay, monthLength, startDay) => (currentDay >= (startDay+1) && (currentDay - startDay) <= monthLength ) 
&& parseInt(currentDay - startDay)


Calendar.propTypes = {
    baseId: PropTypes.string.isRequired, 
    displayBox: PropTypes.bool
}

Calendar.defaultProp = {
    displayBox: false
}
 

/**
 * Display Calendar
 * @component 
 * @param {string} props.baseId - use to create calendar modal id
 * @param {boolean} props.displayBox - true : element is diplayed 
 * @returns {object} Dialog component
 */
function Calendar(props){

    const {baseId, displayBox} = props
    const dispatch = useDispatch() 
    
    /**
     * Object containing methods to set the date and/or time
     */
    const calendarDate = { 

        /**
         * change isEndDate attribute value
         * @method
         * @memberof calendarDate
         * @returns {boolean}
         */
        changeIsEndDate: () => calendarDate.isEndDate = !calendarDate.isEndDate,

        /**
         * Provide selected hour (start or end)
         * @method
         * @memberof calendarDate
         * @param {string | boolean} typeDate 
         * @returns {number} Hour
         */
        getHours: (typeDate = false) => typeDate === "start" ? selectedDate.start.hour ? parseInt(selectedDate.start.hour) : 12 
                                        : typeDate === "end" ? selectedDate.end.hour ? parseInt(selectedDate.end.hour) : 12 
                                        : calendarDate.hour,
        
        /**
         * Provides selected minutes (start or end) in correct format
         * @method
         * @memberof calendarDate
         * @param {string | boolean} unitOrDecimal - sets the desired minutes (unit or decimal)
         * @param {string | boolean} typeDate - set type date : end or start
         * @returns {number} minutes
         */                             
        getMinutes: (unitOrDecimal = false, typeDate = false) => {
            const minutes = typeDate === "end" ? selectedDate.end.minute ? selectedDate.end.minute : 0 
            : typeDate === "start" ? selectedDate.start.minute ? selectedDate.start.minute : calendarDate.minute : calendarDate.minute
            return !unitOrDecimal ? parseInt(minutes) : unitOrDecimal === "unit" 
            ? minutes > 9 ? parseInt(String(minutes).substring(1)) : parseInt(minutes)
            : minutes > 9 ? parseInt(String(minutes).substring(0, 1)) : 0
        },

        /**
         * Set and store date and his type
         * @method 
         * @memberof calendarDate 
         * @param {object} selectedDate 
         */
        initDate: (selectedDate) => { 
            if(datePickerParams.is[baseId].period){
                datePickerParams.is[baseId].period = true
                calendarDate.nameSuffix = "End"
                calendarDate.typeDate = !selectedDate.start.day || !calendarDate.isEndDate() ? "start" : "end" 
            } else { calendarDate.typeDate = false }
            if(datePickerParams.is[baseId].date){ calendarDate.setDate(selectedDate.calendar) } 
            if(datePickerParams.is[baseId].time){ calendarDate.setTime(selectedDate.calendar) }
        },

        /**
         * Defines whether date is end or start date
         * @method 
         * @memberof calendarDate 
         * @return {boolean} isEndDate
         */
        isEndDate: () => selectedDate.status === "pending" ? true : false,

        nameSuffix: "",

        /**
         * Store date displayed by Calendar
         * @method 
         * @memberof calendarDate
         * @param {object} date 
         * @example { day: 01, month: 0, year: 2022} 
         */
        setDate: (date) => {
            calendarDate.day = date.day ? parseInt(date.day) : currentDate.day
            calendarDate.month = date.month ? parseInt(date.month) : currentDate.month
            calendarDate.year = date.year ? parseInt(date.year) : currentDate.year
        },

        /**
         * Store time displayed by Calendar
         * @method 
         * @memberof calendarDate
         * @param {object} time 
         * @example { hour: 01, minute: 00} 
         */
        setTime: (time) => {
            calendarDate.hour = time.hour ? parseInt(time.hour) : 12
            calendarDate.minute = time.minute ? parseInt(time.minute) : 0
        }

    }

    const selectedDate = useSelector(selectSelectedDate(baseId))

    if(!calendarDate.day){ calendarDate.initDate(selectedDate) }

    const calendarMonthSelected = calendarDate.month - 1
    const date = new Date(calendarDate.year, calendarMonthSelected, 1)
    const startDay = date.getDay()
    const monthLength = months.getLength(calendarMonthSelected, calendarDate.year)
    const monthDays = Array(42).fill(1)
    const startYear = getLimitYear("min")
    const years = Array(100).fill(startYear)

    const calendarOptions = [
        { name: "previous-month", type: "icon" }, 
        { name: "home", type: "icon" }, 
        { name: "month", type: "select", value: months.name[calendarMonthSelected] }, 
        { name: "year", type: "select", value: calendarDate.year }, 
        { name: "next-month", type: "icon" }
    ]
    
    /**
     * Object containing the methods to apply during a click 
     */
    const click = {

        /**
         * Checks that the month parameter is between 1 and 12, otherwise assigns a new value (start or end of the interval)
         * @method 
         * @memberof click
         * @param {number} month 
         * @returns {number} month
         */
        browseMonths: (month) => month > 12 ? 1 : month < 1 ? 12 : month,

        /**
         * Function to trigger when clicking on a day
         * @method 
         * @memberof click
         * @param {object} e - event 
         * @see click.fct
         */
        days: (e) => click.fct(e, "Day"), 

        /**
         * Save the values, selected on click, and animate the calendar: opening, closing and moving in the sections. 
         * Function to trigger when clicking on a day, month, year, hour or minute.
         * @method 
         * @memberof click
         * @param {object} e - event 
         */
        fct: (e, name) => {

            // Delete error messages
            dispatch(errorAction.clear(baseId))

            // Get value
            let value = name === "Month" ? parseInt(months.name.indexOf(e.target.textContent)) + 1 
                        : name === "Minute" ? parseInt(e.target.getAttribute("id").indexOf("minutesuni") > 0
                        ? String(document.querySelector(
                            `div#${datePickerParams.getTimeSelectId(baseId, "minutesDec", calendarDate.typeDate)} .selected-option`).textContent) 
                        + String(document.querySelector(
                            `div#${datePickerParams.getTimeSelectId(baseId, "minutesUni", calendarDate.typeDate)} .selected-option`).textContent) 
                        : String(document.querySelector(
                            `div#${datePickerParams.getTimeSelectId(baseId, "minutesDec", calendarDate.typeDate)} .selected-option`).textContent) 
                        + String(document.querySelector(
                            `div#${datePickerParams.getTimeSelectId(baseId, "minutesUni", calendarDate.typeDate)} .selected-option`).textContent)
                        ) : name === "Hour" ? parseInt(document.querySelector(
                            `div#${datePickerParams.getTimeSelectId(baseId, "hours", calendarDate.typeDate)} .selected-option`).textContent)  
                        : parseInt(e.target.textContent)

            if(Number.isInteger(value)){

                // Store value
                dispatch(selectedDateAction[`setCalendar${name}`](value, baseId))

                // If day save all selected values ​​(month, year, hour, ...) and change type date or close calendar
                if(name === "Day"){ 

                    dispatch(selectedDateAction.setDay(value, baseId, calendarDate.typeDate))
                    dispatch(selectedDateAction.setMonth(calendarDate.month, baseId, calendarDate.typeDate))
                    dispatch(selectedDateAction.setYear(calendarDate.year, baseId, calendarDate.typeDate))
                    
                    if(calendarDate.typeDate !== "start"){ dispatch(paramsAction.updateDisplay(datePickerParams.id[baseId].modal, false)) }
                    
                    let time = false 
                    if(datePickerParams.is[baseId].time){
                        const hour = parseInt(
                            document.querySelector(`div#${datePickerParams.getTimeSelectId(baseId, "hours", calendarDate.typeDate)} .selected-option`).textContent)
                        if(transformToNumber(hour) !== calendarDate.hour){ dispatch(selectedDateAction.setHour(hour, baseId, calendarDate.typeDate)) }
                        const minutes = String(document.querySelector(`div#${datePickerParams.getTimeSelectId(baseId, "minutesDec", calendarDate.typeDate)} .selected-option`).textContent) 
                                    + String(document.querySelector(`div#${datePickerParams.getTimeSelectId(baseId, "minutesUni", calendarDate.typeDate)} .selected-option`).textContent)
                        if(transformToNumber(minutes) !== selectedDate.minute){ dispatch(selectedDateAction.setMinute(minutes, baseId, calendarDate.typeDate)) }
                        time = transformToNumber(hour) + ":" + minutes
                    } 

                    const dateToVerify = click.getFormattedValue(value, time)
                    document.getElementById(calendarDate.typeDate && calendarDate.typeDate === "end" ? baseId+"-end" : baseId).value = dateToVerify
                    datePickerParams.eventFunction.execute(baseId, dateToVerify, "onBlur")

                    if(datePickerParams.is[baseId].period){ calendarDate.changeIsEndDate() }

                } else { click.show(datePickerParams.id[baseId].daySelect, baseId) }
            }

            dispatch(errorAction.getErrors(baseId))
        },

        /**
         * Provide value in correct format
         * @method 
         * @memberof click
         * @param {string} day 
         * @param {string} time 
         * @returns {string} date
         */
        getFormattedValue: (day, time = false) => {
            day = parseInt(day)
            const month = parseInt(calendarDate.month)
            const year = calendarDate.year
            let date = false
            switch(validation.formats.lang){
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

        /**
         * Function to trigger when clicking on a hour
         * @method 
         * @memberof click
         * @param {object} e - event 
         * @see click.fct
         */
        hour: (e) => click.fct(e, "Hour"),

        /**
         * Function to trigger when clicking on a minute
         * @method 
         * @memberof click
         * @param {object} e - event 
         * @see click.fct
         */
        minute: (e) => click.fct(e, "Minute"),

        /**
         * Function to trigger when clicking on a month
         * @method 
         * @memberof click
         * @param {object} e - event 
         * @see click.fct
         */
        months: (e) => click.fct(e, "Month"),

        /**
         * Triggers calendar menu actions
         * @method 
         * @memberof click
         * @param {object} e - event 
         */
        optionSelect: (e) => {
            const item = e.target
            deleteSelectedDay()
            switch(item.getAttribute("id")){
                case datePickerParams.id[baseId].nextMonthBtn :
                    dispatch(selectedDateAction.setCalendarMonth(click.browseMonths(parseInt(calendarDate.month) + 1), baseId, calendarDate.typeDate))
                    break
                case datePickerParams.id[baseId].prevMonthBtn : 
                    dispatch(selectedDateAction.setCalendarMonth(click.browseMonths(parseInt(calendarDate.month) - 1), baseId, calendarDate.typeDate))
                    break 
                case datePickerParams.id[baseId].selectedMonth : 
                    click.show(datePickerParams.id[baseId].monthSelect, baseId)
                    break 
                case datePickerParams.id[baseId].selectedYear : 
                    click.show(datePickerParams.id[baseId].yearSelect, baseId)
                    document.getElementById(datePickerParams.id[baseId].yearSelect).scroll(
                        0, (calendarDate.year - getLimitYear("min"))*8
                    )
                    break
                case datePickerParams.id[baseId].todayBtn : 
                    dispatch(selectedDateAction.initCalendar(baseId))
                    break
                default: return false
            }},

        /**
         * Displays element corresponding to first parameter
         * @method 
         * @memberof click
         * @param {string} elementId 
         * @param {string} baseId 
         */
        show: (elementId, baseId) => {
            document.querySelector(`#${datePickerParams.id[baseId].modal} .show`).classList.remove("show")
            document.getElementById(elementId).classList.add("show")
        },

        /**
         * Function to trigger when clicking on a year
         * @method 
         * @memberof click
         * @param {object} e - event 
         * @see click.fct
         */
        years: (e) => click.fct(e, "Year")
    }

    /**
     * Displays the selected date on the calendar
     * @param {object} e - event
     */
    function displaySelectedDay(e = false) {
        const startMonth = parseInt(selectedDate.start.month)
        const startYear = parseInt(selectedDate.start.year)
        const selectedDayItem = e && e.target
        if(startMonth !== calendarDate.month || startYear !== calendarDate.year || calendarDate.typeDate !== "start" ) {
            deleteSelectedDay()
        }
        if(!selectedDate.start.day || calendarDate.typeDate === "start"){ return }
        if(calendarDate.month < startMonth && calendarDate.year <= startYear) { return }
        const end = parseInt(selectedDayItem ? selectedDayItem.textContent : selectedDate.end.day ? selectedDate.end.day : selectedDate.start.day)
        const start = startMonth === calendarDate.month ? parseInt(selectedDate.start.day) - 1 : 0
        if(end > start){
            const idSplitted = e.target.getAttribute("id").split("-")
            const numberId = idSplitted[idSplitted.length - 1]
            Array(end - start).fill(0).map((item, index) => {
                const element = document.getElementById(`dayLi-${baseId}-${numberId - index}`)
                if(element){ element.classList.toggle("selected-day") }
            })
        }
    }
 
    /**
     * Highlights the day of the week corresponding to the hovered day of the month
     * @param {number} weekdayNumber 
     * @param {boolean} highlight 
     */
    function showCorrespondingWeekday(weekdayNumber, highlight = true){ 
        document.getElementById(`wd${baseId}-${weekdays[weekdayNumber]}`).style.opacity = highlight ? 1 : 0.5 
        document.getElementById(`wd${baseId}-${weekdays[weekdayNumber]}`).style.borderBottom = highlight ? "1px solid" : "none" 
    }
    
    return(
        <Dialog 
            dialogBoxId={datePickerParams.id[baseId].modal} 
            name="hrnet-dp-modal" 
            displayBox={displayBox} 
            isModal={true} 
            color={style.color()} 
            backgroundColor={style.backgroundColor()} 
            longSize={datePickerParams.is[baseId].dateTime}
        >
            {(selectedDate.type !== "time" && selectedDate.type !== "timePeriod") && (
                <CalendarSection>
                    <CalendarSelect baseId={baseId} name="option" list={calendarOptions} onClickFunction={click.optionSelect} />
                    <CalendarBox $name={`display`} id={datePickerParams.id[baseId].calendarDisplayBox} className="date-ctn" data-testid="date-section-test" >
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
                                            onMouseOver={(e) => { showCorrespondingWeekday( (index) - (parseInt(index/7)*7) ) 
                                                                datePickerParams.is[baseId].period && displaySelectedDay(e, calendarMonthSelected+1)}}
                                            onMouseOut={(e) => { showCorrespondingWeekday( (index) - (parseInt(index/7)*7), false )  
                                                                datePickerParams.is[baseId].period && displaySelectedDay(e, calendarMonthSelected+1)}}
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
                <CalendarSection $flexDirection="row" $name="timeSection" $flexWrap={datePickerParams.is[baseId].period && "wrap"} className={datePickerParams.is[baseId].period ? "time-period" : null}>
                    {datePickerParams.is[baseId].period && (
                    <div>
                        <p>Start</p>
                        <TimeSelect 
                            baseId={baseId} 
                            maxValue={23} 
                            name={`hoursStart`} 
                            reduceSize={true}
                            selectedValue={calendarDate.getHours("start")} 
                            onClickFunction={click.hour}
                        />
                        <div className="time-separator">:</div>
                        <div className="minutes-ctn">
                            <TimeSelect 
                                baseId={baseId} 
                                maxValue={5} 
                                name={`minutesDecStart`}  
                                reduceSize={true}
                                selectedValue={calendarDate.getMinutes("deci", "start")} 
                                onClickFunction={click.minute}
                            />
                            <TimeSelect 
                                baseId={baseId} 
                                name={`minutesUniStart`}  
                                reduceSize={true}
                                selectedValue={calendarDate.getMinutes("unit", "start")} 
                                onClickFunction={click.minute} 
                            />
                        </div>
                    </div>
                    )}
                    <div data-testid="time-section-test" style={{display: calendarDate.typeHour === "start" && "none"}}>
                        {datePickerParams.is[baseId].period && (<p>End</p>)}
                        <TimeSelect 
                            baseId={baseId} 
                            maxValue={23} 
                            name={`hours${calendarDate.nameSuffix}`} 
                            reduceSize={datePickerParams.is[baseId].period}
                            selectedValue={calendarDate.getHours(datePickerParams.is[baseId].period && "end")} 
                            onClickFunction={click.hour}
                        />
                        <div className="time-separator">:</div>
                        <div className="minutes-ctn">
                            <TimeSelect 
                                baseId={baseId} 
                                maxValue={5} 
                                name={`minutesDec${calendarDate.nameSuffix}`} 
                                reduceSize={datePickerParams.is[baseId].period}
                                selectedValue={calendarDate.getMinutes("deci", datePickerParams.is[baseId].period && "end")} 
                                onClickFunction={click.minute}
                            />
                            <TimeSelect 
                                baseId={baseId} 
                                name={`minutesUni${calendarDate.nameSuffix}`} 
                                reduceSize={datePickerParams.is[baseId].period}
                                selectedValue={calendarDate.getMinutes("unit", datePickerParams.is[baseId].period && "end")} 
                                onClickFunction={click.minute} 
                            />
                        </div>
                    </div>
                </CalendarSection>
            )}
        </Dialog>
    )

}

export default Calendar