import { fireEvent, screen } from "@testing-library/react"
import DatePicker from "../lib/component/datePicker/index"
import { render } from "../renderTest" 
import { months } from "../lib/utils/date"


const labelText = "Test label" 
const datePickerTest = (id, label = labelText, type="dateTime") => <DatePicker inputId={id} label={label} type={type} />


describe("DatePicker to date format", () => {

    const datePickerId = "date-picker-test"

    test("Should display an error because label format is wrong", async () => {

        render(datePickerTest(datePickerId, "My wrong l@bel text !")) 

        const errorBox = document.getElementById(`${datePickerId}-err-msg`)

        expect(errorBox.textContent).toEqual("label is in wrong format !Only alphanumeric characters, hyphen and apostrophe are allowed.")

    })

    test("Should display an error because input value format is wrong", async () => {
 
        render(datePickerTest(datePickerId)) 

        const ipt = screen.getByTestId("date-picker-input")
        const errorBox = document.getElementById(`${datePickerId}-err-msg`)

        fireEvent.change(
            ipt, 
            { target : { value: "valueTooShort" } }
        )
        fireEvent.blur(ipt)

        expect(errorBox.textContent).toEqual("dateTime is too short !Its length must be 16 characters.")

        fireEvent.change(
            ipt, 
            { target : { value: "valueTestIsTooLongString" } }
        )
        fireEvent.blur(ipt)
        
        
        expect(errorBox.textContent).toEqual("dateTime is too long !Its length must be 16 characters.")

    })

    test("Should display label, input text and Calendar without error", async () => {

        render(datePickerTest(datePickerId)) 

        const label = screen.getByRole("label") 
        const ipt = screen.getByTestId("date-picker-input")
        const calendar = screen.getByTestId("date-picker-calendar")
        const errorBox = document.getElementById(`${datePickerId}-err-msg`)

        expect(label.textContent).toEqual(labelText)
        expect(ipt.getAttribute("id")).toEqual(datePickerId)
        expect(ipt.getAttribute("type")).toEqual("text") 
        expect(calendar.getAttribute("id")).toEqual(`${datePickerId}-calendar-modal`)
        expect(calendar.style.display).toEqual("")
        expect(errorBox.textContent).toEqual("")

    })

    test("Should display Calendar options menu and change month selected on click", async () => {

        render(datePickerTest(datePickerId)) 

        const calendarOptionsMenu = screen.getByTestId("calendar-options-menu")
        const monthSelectedBox = document.getElementById(`${datePickerId}-selected-month`) 
        const monthSelected = monthSelectedBox.textContent
        const todayDate = new Date()

        expect(calendarOptionsMenu).toBeDefined()
        expect(monthSelectedBox).toBeDefined()

        fireEvent.click(screen.getByTestId(`previous-month-test`))

        expect(monthSelected).toEqual(months.name[todayDate.getMonth()])
        expect(monthSelectedBox.textContent).toEqual(months.name[todayDate.getMonth()-1])

        fireEvent.click(screen.getByTestId(`next-month-test`))

        expect(monthSelectedBox.textContent).toEqual(months.name[todayDate.getMonth()])

        const homeBtn = screen.getByTestId(`home-test`) 
        const monthBtn = screen.getByTestId(`month-test`) 
        const yearBtn = screen.getByTestId(`year-test`) 
        const daySelect = document.getElementById(`${datePickerId}-day-select`)
        const monthSelect = document.getElementById(`${datePickerId}-month-select`)
        const yearSelect = document.getElementById(`${datePickerId}-year-select`)

        expect(homeBtn).toBeDefined()
        expect(monthBtn).toBeDefined()
        expect(yearBtn).toBeDefined()
        expect(daySelect.classList).toContain("show")
        expect(monthSelect.classList).not.toContain("show")
        expect(yearSelect.classList).not.toContain("show")

        fireEvent.click(monthBtn)

        expect(daySelect.classList).not.toContain("show")
        expect(monthSelect.classList).toContain("show")

        fireEvent.click(document.getElementById(`${datePickerId}-month-select-option-0`))

        expect(monthSelect.classList).not.toContain("show")
        expect(daySelect.classList).toContain("show")
        expect(monthBtn.textContent).toEqual("January")

        fireEvent.click(homeBtn)

        expect(monthSelectedBox.textContent).toEqual(months.name[todayDate.getMonth()])

    })

})

describe("DatePicker to dateTime format", () => {

    const dateTimePickerId = "date-time-picker-test"

    test("Should display date and time section", async () => {

        render(datePickerTest(dateTimePickerId)) 

        const ipt = screen.getByTestId("date-picker-input")
        const dateSection = screen.getByTestId("date-section-test") 
        const timeSection = screen.getByTestId(`time-section-test`)

        expect(ipt.getAttribute("id")).toEqual(dateTimePickerId)
        expect(dateSection).toBeDefined()
        expect(timeSection).toBeDefined()

    })

    test("Should display less hour button and change hour selected on click", async () => {

        render(datePickerTest(dateTimePickerId)) 

        const lessHourBtn = screen.getByTestId(`${dateTimePickerId}-hours-select-less-btn-test`)
        const hourSelected = document.querySelector(`#${dateTimePickerId}-hours-select .selected-option`)
        const hourBeforeClick = parseInt(hourSelected.textContent)

        fireEvent.click(lessHourBtn)

        expect(parseInt(hourSelected.textContent)).toEqual(hourBeforeClick - 1)

    })

    test("Should display more hour button and change hour selected on click", async () => {

        render(datePickerTest(dateTimePickerId)) 

        const moreHourBtn = screen.getByTestId(`${dateTimePickerId}-hours-select-more-btn-test`)
        const hourSelected = document.querySelector(`#${dateTimePickerId}-hours-select .selected-option`)
        const hourBeforeClick = parseInt(hourSelected.textContent)

        fireEvent.click(moreHourBtn)

        expect(parseInt(hourSelected.textContent)).toEqual(hourBeforeClick + 1)

    })

    test("Should display less minutes button and change minutes selected on click", async () => {

        render(datePickerTest(dateTimePickerId)) 

        const lessMinutesDecBtn = screen.getByTestId(`${dateTimePickerId}-minutesdec-select-less-btn-test`)
        const lessMinutesUniBtn = screen.getByTestId(`${dateTimePickerId}-minutesuni-select-less-btn-test`)
        const minutesDecSelected = document.querySelector(`#${dateTimePickerId}-minutesdec-select .selected-option`)
        const minutesUniSelected = document.querySelector(`#${dateTimePickerId}-minutesuni-select .selected-option`)
        const minutesDecBeforeClick = parseInt(minutesDecSelected.textContent)
        const minutesUniBeforeClick = parseInt(minutesUniSelected.textContent)

        expect(minutesDecBeforeClick).toEqual(0)
        expect(minutesUniBeforeClick).toEqual(0)

        fireEvent.click(lessMinutesDecBtn)
        fireEvent.click(lessMinutesUniBtn) 

        expect(parseInt(minutesDecSelected.textContent)).toEqual(5)
        expect(parseInt(minutesUniSelected.textContent)).toEqual(9)

    })

    test("Should display more minutes button and change minutes selected on click", async () => {

        render(datePickerTest(dateTimePickerId)) 

        const moreMinutesDecBtn = screen.getByTestId(`${dateTimePickerId}-minutesdec-select-more-btn-test`)
        const moreMinutesUniBtn = screen.getByTestId(`${dateTimePickerId}-minutesuni-select-more-btn-test`)
        const minutesDecSelected = document.querySelector(`#${dateTimePickerId}-minutesdec-select .selected-option`)
        const minutesUniSelected = document.querySelector(`#${dateTimePickerId}-minutesuni-select .selected-option`)
        const minutesDecBeforeClick = parseInt(minutesDecSelected.textContent)
        const minutesUniBeforeClick = parseInt(minutesUniSelected.textContent)

        expect(minutesDecBeforeClick).toEqual(0)
        expect(minutesUniBeforeClick).toEqual(0)

        fireEvent.click(moreMinutesDecBtn)
        fireEvent.click(moreMinutesUniBtn) 

        expect(parseInt(minutesDecSelected.textContent)).toEqual(1)
        expect(parseInt(minutesUniSelected.textContent)).toEqual(1)

    })
    
})

describe("DatePicker to dateTimePeriod format", () => {

    const dateTimePickerId = "period-picker-test"

    test("Should display date time period sections", async () => {

        render(datePickerTest(dateTimePickerId, labelText, "dateTimePeriod")) 

        const lessEndHourBtn = screen.getByTestId(`${dateTimePickerId}-end-hours-select-less-btn-test`)
        const moreEndHourBtn = screen.getByTestId(`${dateTimePickerId}-end-hours-select-more-btn-test`)
        const lessEndMinDecBtn = screen.getByTestId(`${dateTimePickerId}-end-minutesdec-select-less-btn-test`)
        const moreEndMinDecBtn = screen.getByTestId(`${dateTimePickerId}-end-minutesdec-select-more-btn-test`)
        const lessEndMinUniBtn = screen.getByTestId(`${dateTimePickerId}-end-minutesuni-select-less-btn-test`)
        const moreEndMinUniBtn = screen.getByTestId(`${dateTimePickerId}-end-minutesuni-select-more-btn-test`)

        expect(document.getElementById(`${dateTimePickerId}-end`)).toBeDefined()
        expect(lessEndHourBtn.getAttribute("id")).toEqual(`${dateTimePickerId}-end-hours-select-less-btn`)
        expect(moreEndHourBtn.getAttribute("id")).toEqual(`${dateTimePickerId}-end-hours-select-more-btn`)
        expect(lessEndMinDecBtn.getAttribute("id")).toEqual(`${dateTimePickerId}-end-minutesdec-select-less-btn`)
        expect(moreEndMinDecBtn.getAttribute("id")).toEqual(`${dateTimePickerId}-end-minutesdec-select-more-btn`)
        expect(lessEndMinUniBtn.getAttribute("id")).toEqual(`${dateTimePickerId}-end-minutesuni-select-less-btn`)
        expect(moreEndMinUniBtn.getAttribute("id")).toEqual(`${dateTimePickerId}-end-minutesuni-select-more-btn`)

    })
    
})