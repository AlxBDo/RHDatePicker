import { currentDate, getLimitYear, months } from "../utils/date"
import { datePickerParams } from "./datePickerParams"
import { validation } from "./validation"

/**
 * Provides settings and methods for calendar interaction and display
 */
 export const calendar = {

    isDisplay: false,

    /**
     * contains the attributes: day, month and year
     */
    selected: {
        day: currentDate.day,
        month: currentDate.month,
        year: currentDate.year,
    },

    /**
     * display or hide modal calendar
     * @param {boolean} visible - true : calendar modal is displayed
     */
    displayModal: (visible = true) => document.getElementById(datePickerParams.id.modal).style.display = visible ? "flex" : "none",

    /**
     * generate month day
     * @param {integer} currentCell 
     * @param {integer} monthLength 
     * @param {integer} startCell - cell from which the day number of the month is displayed
     */
    generateMonthDay: (currentCell, monthLength, startCell) => {
        const cellDay = document.getElementById(`${datePickerParams.id.input}-d${ currentCell }`)
        let emptyCell = false
        if(currentCell >= (startCell+1) && (currentCell - startCell) <= monthLength ){
            cellDay.textContent = currentCell - startCell
        } else { emptyCell = true }
        if(currentCell < 8 || currentCell > 27){ 
            if(cellDay.classList.contains("empty-cell")){ if(!emptyCell){ cellDay.classList.remove("empty-cell") } 
            } else if(emptyCell){ 
                cellDay.classList.add("empty-cell") 
                cellDay.textContent = ""
            }
        }
        if( currentCell < 42 ) { calendar.generateMonthDay( currentCell + 1, monthLength, startCell) }
    },

    /**
     * convert single digit integer into double digit 
     * @returns {number}
    */
    getNumber: (number) => number.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),

    /**
     * provides select option
     * @param {string} value 
     * @param {string} id - element html id
     * @returns {object} <option>
     */
    getSelectOption : (value, id) => {
        const opt = document.createElement("span")
        opt.setAttribute("id", id)
        opt.textContent = value
        return opt
    },

    /**
     * provides year select options
     * @param {object} selectItem - select html object 
     * @param {integer} currentYear 
     * @param {integer} endYear 
     */
    getYearSelectOpt: (selectItem, currentYear, endYear) => { 
        selectItem.append( calendar.getSelectOption(currentYear ,`${datePickerParams.id.input}-year-opt-${currentYear}`) )
        if(currentYear < endYear){ calendar.getYearSelectOpt(selectItem, currentYear + 1, endYear) }
    },

    /**
     * initialize month select
     */
    initMonthSelect: () => {
        const monthSelect = document.getElementById(datePickerParams.id.monthSelect)
        monthSelect.innerHTML = ""
        months.name.forEach((month, index) => {
            monthSelect.append(calendar.getSelectOption(month, datePickerParams.id.monthSelectOpt + index))
        })
    },

    /**
     * initialize year select
     */
    initYearSelect : () => {
        const yearSelect = document.getElementById(datePickerParams.id.yearSelect)
        yearSelect.innerHTML = ""
        calendar.getYearSelectOpt(
            yearSelect, 
            getLimitYear("min"),
            getLimitYear("max")
        )
    },

    /**
     * modify calendar date selected
     * @param {string} value 
     * @param {string} what - accept "day", "month" or "year" 
     */
    changeDate: (value, what) => {
        if(["day", "month", "year"].includes(what) && (Number.isInteger(parseInt(value)) || value.length === 1)){
            let maxValue =  11
            let minValue = 0
            if(what === "day"){ 
                maxValue = months.length[calendar.selected.month]
                minValue++
            } else if(what === "year"){
                maxValue = getLimitYear("max") 
                minValue = getLimitYear("min")
            }
            calendar.selected[what] = value === "+" ? (calendar.selected[what] + 1) 
            : value === "-" ? (calendar.selected[what] - 1) : parseInt(value) 
            if(calendar.selected[what] > maxValue){ calendar.selected[what] = minValue 
            } else if(calendar.selected[what] < minValue){ calendar.selected[what] = maxValue }
        }
    },

    /**
     * shift the box to display day, month or year select
     * @param {number} howMany - value applied to margin-left
     */
    moveDisplayBox: (howMany = 0) => document.getElementById(datePickerParams.id.calendarDisplayBox).style.marginLeft = howMany+"px",

    /**
     * search and execute function triggered on click on box option items
     * @param {object} e 
     */
    onClickOptions: (e) => {
        const item = e.target
        switch(item.getAttribute("id")){
            case datePickerParams.id.nextMonthBtn :
                calendar.changeDate("+", "month") 
                item.textContent = calendar.selected.month
                break
            case datePickerParams.id.prevMonthBtn : 
                calendar.changeDate("-", "month") 
                item.textContent = calendar.selected.month
                break 
            case datePickerParams.id.selectedMonth : 
                calendar.moveDisplayBox(-320)
                break 
            case datePickerParams.id.selectedYear : 
                calendar.moveDisplayBox(-635)
                document.getElementById(`${datePickerParams.id.input}-year-select`).scroll(0, (calendar.selected.year - getLimitYear("min"))*8)
                break
            case datePickerParams.id.todayBtn : 
                calendar.selected = { day: currentDate.day, month: currentDate.month, year: currentDate.year }
                break
            default: return false
        }
    },

    /**
     * search and execute function triggered on click on select (month & year)
     * @param {object} e 
     */
    onClickSelect: (e, typeOfSelect) => {
        calendar.changeDate(parseInt(e.target.textContent), typeOfSelect)
        calendar.moveDisplayBox()
    },

}