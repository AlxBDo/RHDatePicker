import React, { useEffect } from "react";

import { calendar, params, validation } from "./tools"
import { CalendarBox, CalendarModal, CalendarOption, DatePickerContainer, DateSelect, DayTable} from "./style"


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
const DatePicker = ({
    inputId, 
    label, 
    eventFunction = {},
    htmlClass = {}
}) => {

    params.initComponentParams(inputId, label, eventFunction, htmlClass)

    useEffect(()=>{
        if(params.id.input === "param"){ validation.displayError() 
        } else { calendar.display(true) }
    },[inputId]) 

    return(
        <DatePickerContainer className={ `hrnet-dp-ctn ${params.htmlClass.container && params.htmlClass.container}` }>
            { params.label && ( 
                <label htmlFor={params.id.input}>{params.label}</label> ) 
            }
            { params.id.input !== "param" && (
                <input 
                    type="date" 
                    id={params.id.input} 
                    name={params.id.input} 
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" 
                    className={ params.htmlClass.input && (`${params.htmlClass.input}`) }
                    onChange={ (e) => { params.listen(e, "onChange") } }
                    onClick={ (e) => { params.listen(e, "onClick") } }
                    onBlur={ (e) => { params.listen(e, "onBlur") } }
                    required 
                />
            ) }
            <div 
                id={`${params.id.input}-err-msg`} 
                className={ `hrnet-dp-error ${params.htmlClass.error && params.htmlClass.error}` }
            ></div>
            <CalendarModal id={params.id.modal} className="hrnet-dp-modal">
                <CalendarBox $name="option" onClick={calendar.onClickOptions}>
                    <CalendarOption $name={`previous-month`} $type={"icon"} id={params.id.prevMonthBtn}></CalendarOption>
                    <CalendarOption $name={"home"} $type={"icon"} id={params.id.todayBtn}></CalendarOption>
                    <CalendarOption $name={`month`} $type={"select"} id={params.id.selectedMonth}></CalendarOption>
                    <CalendarOption $name={"year"} $type={"select"} id={params.id.selectedYear}></CalendarOption>
                    <CalendarOption $name={`next-month`} $type={"icon"} id={params.id.nextMonthBtn}></CalendarOption>
                </CalendarBox>
                <CalendarBox $name={`display`} id={params.id.calendarDisplayBox}>
                    <DayTable>
                        <thead>
                                <tr>{calendar.days.map((day)=>(<th key={day}>{day}</th>))}</tr>
                        </thead>
                        <tbody onClick={calendar.onClickDays}>
                            <tr>
                                <td id={`${params.id.input}-d1`}></td>
                                <td id={`${params.id.input}-d2`}></td>
                                <td id={`${params.id.input}-d3`}></td>
                                <td id={`${params.id.input}-d4`}></td>
                                <td id={`${params.id.input}-d5`}></td>
                                <td id={`${params.id.input}-d6`}></td>
                                <td id={`${params.id.input}-d7`}></td>
                            </tr>
                            <tr>
                                <td id={`${params.id.input}-d8`}></td>
                                <td id={`${params.id.input}-d9`}></td>
                                <td id={`${params.id.input}-d10`}></td>
                                <td id={`${params.id.input}-d11`}></td>
                                <td id={`${params.id.input}-d12`}></td>
                                <td id={`${params.id.input}-d13`}></td>
                                <td id={`${params.id.input}-d14`}></td>
                            </tr>
                            <tr>
                                <td id={`${params.id.input}-d15`}></td>
                                <td id={`${params.id.input}-d16`}></td>
                                <td id={`${params.id.input}-d17`}></td>
                                <td id={`${params.id.input}-d18`}></td>
                                <td id={`${params.id.input}-d19`}></td>
                                <td id={`${params.id.input}-d20`}></td>
                                <td id={`${params.id.input}-d21`}></td>
                            </tr>
                            <tr>
                                <td id={`${params.id.input}-d22`}></td>
                                <td id={`${params.id.input}-d23`}></td>
                                <td id={`${params.id.input}-d24`}></td>
                                <td id={`${params.id.input}-d25`}></td>
                                <td id={`${params.id.input}-d26`}></td>
                                <td id={`${params.id.input}-d27`}></td>
                                <td id={`${params.id.input}-d28`}></td>
                            </tr>
                            <tr>
                                <td id={`${params.id.input}-d29`}></td>
                                <td id={`${params.id.input}-d30`}></td>
                                <td id={`${params.id.input}-d31`}></td>
                                <td id={`${params.id.input}-d32`}></td>
                                <td id={`${params.id.input}-d33`}></td>
                                <td id={`${params.id.input}-d34`}></td>
                                <td id={`${params.id.input}-d35`}></td>
                            </tr>
                            <tr>
                                <td id={`${params.id.input}-d36`}></td>
                                <td id={`${params.id.input}-d37`}></td>
                                <td id={`${params.id.input}-d38`}></td>
                                <td id={`${params.id.input}-d39`}></td>
                                <td id={`${params.id.input}-d40`}></td>
                                <td id={`${params.id.input}-d41`}></td>
                                <td id={`${params.id.input}-d42`}></td>
                            </tr>
                        </tbody>
                    </DayTable>
                    <DateSelect $name={"month"} id={params.id.monthSelect} onClick={calendar.onClickSelect} >
                        <span id={`${params.id.monthSelectOpt}0`}></span>
                        <span id={`${params.id.monthSelectOpt}1`}></span>
                        <span id={`${params.id.monthSelectOpt}2`}></span>
                        <span id={`${params.id.monthSelectOpt}3`}></span>
                        <span id={`${params.id.monthSelectOpt}4`}></span>
                        <span id={`${params.id.monthSelectOpt}5`}></span>
                        <span id={`${params.id.monthSelectOpt}6`}></span>
                        <span id={`${params.id.monthSelectOpt}7`}></span>
                        <span id={`${params.id.monthSelectOpt}8`}></span>
                        <span id={`${params.id.monthSelectOpt}9`}></span>
                        <span id={`${params.id.monthSelectOpt}10`}></span>
                        <span id={`${params.id.monthSelectOpt}11`}></span>
                    </DateSelect>
                    <DateSelect $name={`year`} id={params.id.yearSelect} onClick={calendar.onClickSelect} ></DateSelect>
                </CalendarBox>
            </CalendarModal>
        </DatePickerContainer>
    )

};

export default DatePicker;