/**
 * Provides settings and methods for DatePicker component interaction and display
 */
 class DatePickerParams {

    date = new Date();

    /**
     * contains the attributes: day, month and year
     */
    current = { 
        day: this.date.getDate(),
        month: this.date.getMonth(),
        year: this.date.getFullYear()
    };

    /**
     * store id
     */
    id = {};

    /**
     * store a new id
     * @param {string} name 
     * @param {string} value 
     */
    addId(name, value){ this.id[name] = this.id.input +"-"+ value }
    
    /**
     * initializes the attributes containing the component parameters
     * @param {string} inputId 
     * @param {string} label 
     * @param {object} eventFunction 
     * @param {object} htmlClass 
     */
    initComponentParams(inputId, label, eventFunction, htmlClass){
        this.setInputId(inputId) 
        this.initIdHtml() 
        this.setLabel(label)
        this.setEventFunction(eventFunction) 
        this.setHtmlClass(htmlClass)
    }

    /**
     * initializes the html ids necessary for the operation of the component
     */
    initIdHtml(){
        this.addId("calendarDisplayBox", "display-box" )
        this.addId("modal", "calendar-modal" )
        this.addId("monthSelect", "month-select" )
        this.addId("monthSelectOpt", "month-opt-" )
        this.addId("nextMonthBtn", "next-month" )
        this.addId("prevMonthBtn", "prev-month" )
        this.addId("selectedMonth", "selected-month" )
        this.addId("selectedYear", "selected-year" )
        this.addId("todayBtn", "today" )
        this.addId("yearSelect", "year-select" )
    }

    /**
     * execute the functions corresponding to the eventName parameter
     * @param {event} e 
     * @param {string} eventName 
     */
    listen(e, eventName){
        validation.clearError()
        if(eventName === "onBlur" || eventName === "onChange" || eventName === "onClick"){
            if(eventName === "onClick"){
                e.preventDefault()
                calendar.displayModal()
            }
            this[eventName](eventName !== "onClick" && e.target.value) 
            validation.displayError()
        } 
    }

    /**
     * execute the onblur function passed as a parameter of the DatePicker component
     * @param {string} value : date YYYY-MM-DD 
     */
    onBlur(value){
        if(!this.eventFunction.onBlur){ return false }
        this.eventFunction.onBlur(validation.checkInputValue(value) ? value : false)
    }

    /**
     * execute the onchange function passed as a parameter of the DatePicker component
     * @param {string} value : date YYYY-MM-DD 
     */
    onChange(value){
        if(!this.eventFunction.onChange){ return false }
        this.eventFunction.onChange(validation.checkInputValue(value) ? value : false)
    }

    /**
     * execute the onblur function passed as a parameter of the DatePicker component
     */
    onClick(){
        if(!this.eventFunction.onClick){ return false }
        this.eventFunction.onClick() 
    }

    /**
     * check and store the event functions passed as a parameter of the DatePicker component
     * @param {object} eventFunction 
     */
    setEventFunction(eventFunction){ 
        if(typeof eventFunction === "object"){ 
            if(eventFunction.onBlur && typeof eventFunction.onBlur !== "function"){ return false }
            if(eventFunction.onChange && typeof eventFunction.onChange !== "function"){ return false }
            if(eventFunction.onClick && typeof eventFunction.onClick !== "function"){ return false }
            this.eventFunction = eventFunction 
    }}

    /**
     * check and store html class passed as a parameter of the DatePicker component
     * @param {object} htmlClass 
     */
    setHtmlClass(htmlClass){ if(typeof htmlClass === "object"){ this.htmlClass = htmlClass }}
    
    /**
     * check and store the input id passed as a parameter of the DatePicker component
     * @param {string} id 
     */
    setInputId(id){ this.id.input = validation.checkId(id) ? id : "param" }

    /**
     * check and store the input label passed as a parameter of the DatePicker component
     * @param {string} label 
     */
    setLabel(label){ if(validation.checkLabel(label)){ this.label = label} }

}

export const params = new DatePickerParams()

/**
 * Provides settings and methods for calendar interaction and display
 */
export const calendar = {

    /**
     * contains the attributes: day, month and year
     */
    selected: {
        day: params.current.day,
        month: params.current.month,
        year: params.current.year,
    },

    /**
     * contains week day (only the first 3 letters)
     */
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    /**
     * display calendar
     * @param {boolean} init - initialize select : month and year
     */
    display: (init = false) => {
        if(init){
            calendar.initYearSelect()
            calendar.initMonthSelect()
        }
        const date = new Date(calendar.selected.year, calendar.selected.month, 1)
        const day = date.getDay()
        document.getElementById(params.id.selectedMonth).textContent = calendar.months.name[calendar.selected.month] 
        document.getElementById(params.id.selectedYear).textContent = calendar.selected.year
        calendar.generateMonthDay(1, calendar.months.getLength(calendar.selected.month), day)
        calendar.moveDisplayBox()
    },

    /**
     * display or hide modal calendar
     * @param {boolean} visible - true : calendar modal is displayed
     */
    displayModal: (visible = true) => document.getElementById(params.id.modal).style.display = visible ? "flex" : "none",

    /**
     * generate month day
     * @param {integer} currentCell 
     * @param {integer} monthLength 
     * @param {integer} startCell - cell from which the day number of the month is displayed
     */
    generateMonthDay: (currentCell, monthLength, startCell) => {
        const cellDay = document.getElementById(`${params.id.input}-d${ currentCell }`)
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
     * provides the start and end years of the select
     * @param {string} minOrMax - max = last year accepted 
     * @returns {interger} year
     */
    getLimitYear: (minOrMax) => minOrMax === "max" ? params.current.year + 30 : params.current.year - 70,

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
        selectItem.append( calendar.getSelectOption(currentYear ,`${params.id.input}-year-opt-${currentYear}`) )
        if(currentYear < endYear){ calendar.getYearSelectOpt(selectItem, currentYear + 1, endYear) }
    },

    /**
     * initialize month select
     */
    initMonthSelect: () => {
        const monthSelect = document.getElementById(params.id.monthSelect)
        monthSelect.innerHTML = ""
        calendar.months.name.forEach((month, index) => {
            monthSelect.append(calendar.getSelectOption(month, params.id.monthSelectOpt + index))
        })
    },

    /**
     * initialize year select
     */
    initYearSelect : () => {
        const yearSelect = document.getElementById(params.id.yearSelect)
        yearSelect.innerHTML = ""
        calendar.getYearSelectOpt(
            yearSelect, 
            calendar.getLimitYear("min"),
            calendar.getLimitYear("max")
        )
    },

    /**
     * contains month information
     */
    months: {
        name: [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June", 
            "July", 
            "August",
            "September",
            "October",
            "November",
            "December"
        ], 
        getLength: (month) => {
            switch(month){
                case 1 : return parseInt(calendar.selected.year) % 4 === 0 ? 28 : 27
                case 3 : case 5 : case 7 : case 8 : case 10 : return 30
                default : return 31
            }
        }
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
                maxValue = calendar.months.length[calendar.selected.month]
                minValue++
            } else if(what === "year"){
                maxValue = calendar.getLimitYear("max") 
                minValue = calendar.getLimitYear("min")
            }
            calendar.selected[what] = value === "+" ? (calendar.selected[what] + 1) 
            : value === "-" ? (calendar.selected[what] - 1) : parseInt(value) 
            if(calendar.selected[what] > maxValue){ calendar.selected[what] = minValue 
            } else if(calendar.selected[what] < minValue){ calendar.selected[what] = maxValue }
            calendar.display()
        }
    },

    /**
     * provides the elements of the event object used by event functions 
     * @param {event} e 
     * @param {boolean} splitId - true : split id  
     * @returns {object} constObj{ item, id }
     */
    evenConst: (e, splitId = false) => {
        const item = e.target
        const constObj = {item}
        constObj.id = item.getAttribute("id")
        if(splitId){ constObj.idSplitted = constObj.id.split("-") }
        return constObj
    },

    /**
     * shift the box to display day, month or year select
     * @param {number} howMany - value applied to margin-left
     */
    moveDisplayBox: (howMany = 0) => document.getElementById(params.id.calendarDisplayBox).style.marginLeft = howMany+"px",

    /**
     * function triggered on click on the day table
     * @param {object} e 
     */
    onClickDays: (e) => {
        const day = parseInt(e.target.textContent)
        if(Number.isInteger(day)){ 
            calendar.selected.day = day 
            const date = `${calendar.selected.year}-${calendar.getNumber(calendar.selected.month+1)}-${calendar.getNumber(calendar.selected.day)}`
            document.getElementById(params.id.input).value = date 
            calendar.displayModal(false) 
            params.onChange(date)
            validation.displayError()
        }
    },

    /**
     * search and execute function triggered on click on box option items
     * @param {object} e 
     */
    onClickOptions: (e) => {
        const { item, id } = calendar.evenConst(e) 
        switch(id){
            case params.id.nextMonthBtn :
                calendar.changeDate("+", "month") 
                item.textContent = calendar.selected.month
                break
            case params.id.prevMonthBtn : 
                calendar.changeDate("-", "month") 
                item.textContent = calendar.selected.month
                break 
            case params.id.selectedMonth : 
                calendar.moveDisplayBox(-320)
                break 
            case params.id.selectedYear : 
                calendar.moveDisplayBox(-635)
                document.getElementById(`${params.id.input}-year-select`).scroll(0, (calendar.selected.year - calendar.getLimitYear("min"))*8)
                break
            case params.id.todayBtn : 
                calendar.selected = { day: params.current.day, month: params.current.month, year: params.current.year }
                calendar.display() 
                break
            default: return false
        }
    },

    /**
     * search and execute function triggered on click on select (month & year)
     * @param {object} e 
     */
    onClickSelect: (e) => {
        const { item, idSplitted } = calendar.evenConst(e, true)
        const typeOfTarget = item.localName
        const typeOfSelect = idSplitted[(idSplitted.length - ( typeOfTarget === "p" ? 2 : 3 ))]
        // Get option select value and update current attribute 
        calendar.changeDate(parseInt(idSplitted[idSplitted.length - 1]), typeOfSelect)
        calendar.display()
    },

}

/**
 * Provides input and param check methods
 */
export const validation = {

    error: false,

    /**
     * provides allowed length 
     * contains dateInput, id, label attributes
     */
    allowedLength: {
        dateInput: {max: 10, min: 10},
        id: { max: 15, min: 2 }, 
        label: { max: 35, min: 4 }
    }, 

    /**
     * provides allowed type (return of typeof) 
     * contains eventFuntion attributes
     */
    allowedType: { eventFunction: "function" },

    /**
     * clear error attribute and error message displayed
     */
    clearError: () => {
        validation.error = false 
        validation.displayError()
    },

    /**
     * RegExp object instancied to ckeck date input value - test : ^\d{4}-\d{2}-\d{2}$
     */
    dateInputRegExp: new RegExp(/^\d{4}-\d{2}-\d{2}$/),

    /**
     * display or hide error message
     */
    displayError: () => { 
        if(validation.error){
            document.getElementById(`${params.id.input}-err-msg`).style.display = "block"
            document.getElementById(`${params.id.input}-err-msg`).innerHTML = validation.getError()
        } else {
            document.getElementById(`${params.id.input}-err-msg`).style.display = "none"
        }
    },

    /**
     * RegExp object instancied to check id passed as parameter - test : ^[a-zA-Z0-9-]+$
     */
    idRegExp: new RegExp("^[a-zA-Z0-9-]+$", "g"),

    /**
     * RegExp object instancied to check label passed as paramater - test : ^[a-zA-Z0-9 -/']+$
     */
    labelRegExp: new RegExp("^[a-zA-Z0-9 -/']+$", "g"),

    /**
     * @see validation.idRegExp
     * @param {string} datePickerId 
     * @returns {boolean}
     */
    checkId: (datePickerId) => validation.checkString(datePickerId, "id"),

    /**
     * @see validation.dateInputRegExp
     * @param {string} value - date format : YYYY-MM-DD 
     * @returns {boolean}
     */
    checkInputValue: (value) => validation.checkString(value, "dateInput"),

    /**
     * @see validation.labelRegExp
     * @param {string} datePickerLabel
     * @returns {boolean}
     */
    checkLabel: (datePickerLabel) => validation.checkString(datePickerLabel, "label"),

    /**
     * controls the length and format of the string parameter
     * @param {string} string 
     * @param {string} stringName - accept dateInput, id or label
     * @returns {boolean}
     */
    checkString: (string, stringName) => {
        const stringLength = string.length
        if(stringLength > validation.allowedLength[stringName].max){ 
            validation.error = { what: stringName, why: "tooLong" } 
        }
        if(stringLength < validation.allowedLength[stringName].min){
            validation.error = {  what: stringName, why: "tooShort" }
        }
        if(!validation[stringName+"RegExp"].test(string)){
            validation.error = {  what: stringName, why: "wrongFormat" }
        }
        return !validation.error
    },

    /**
     * provide the message corresponding to the error encountered
     * @returns {string}
     */
    getError: () => errorMessage.get(validation.error)

};
 
/**
 * Provides error message to validation object
 */
const errorMessage = { 

    allowed: {

        length: ({max, min}) => `Its length must be between ${min} and ${max} characters.`,

        format: (what) => {
            switch(what){
                case "date":
                    return "Date format must be : YYYY-MM-DD ."
                case "id":
                    return "Only alphanumeric characters are allowed."
                case "label":
                    return "Only alphanumeric characters, hyphen and apostrophe are allowed."
                default: 
                    return "Impossible to determinate good format !"
            }
        },

        type: (expectedType) => `The expected type is ${expectedType}`

    },

    get: (errorObj) => errorObj.what + " " + errorMessage[errorObj.why](errorObj.what),

    tooLong: (what) => `is too long ! 
    <p>${errorMessage.allowed.length(validation.allowedLength[what])}</p>`,

    tooShort: (what) => `is too short ! 
    <p>${errorMessage.allowed.length(validation.allowedLength[what])}</p>`,

    wrongFormat: (what) => `is in wrong format ! 
    <p>${errorMessage.allowed.format(what)}</p>`,

    wrongType: (what) => `is in wrong type ! 
    <p>${errorMessage.allowed.type(validation.allowedType[what])}</p>` 

};
