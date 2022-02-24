import selectedDateReducer from "../lib/features/selectedDate" 
import * as selectedDateAction from "../lib/features/selectedDate"


describe("SelectedDate actions and reducer", () => {

    const dateObject = { day: false, month: false, year: false}
    const timeObject = { hour: false, minute: false }
    
    function setInitialDateState(type) { 
        let timeAttributes = type.indexOf("date") >= 0 ? type.indexOf("ime") >= 0 ? {...dateObject, ...timeObject} 
                            : dateObject : timeObject
        if( type.indexOf("Period") > 0 ){ 
            timeAttributes = { start: timeAttributes, end: timeAttributes, calendar: timeAttributes }
        } else { timeAttributes = { calendar: timeAttributes, ...timeAttributes } }
        return {
            status: "default", 
            type,
            ...timeAttributes
        }
    }

    it("Should have an empty status", () => {

        expect(selectedDateReducer(
            undefined, 
            { type: "@INIT" }
        )).toEqual({
            status: "empty", 
            dates: {}
        })

    })

    describe("Should have a status equal to 1 ", () => {

        const stateDateObject = setInitialDateState("date")

        it("and dates attribute is equal to stateDateObject", () => {

            expect(selectedDateReducer(
                { status: "empty", dates: {} }, 
                selectedDateAction.init("stateDateObject", "date")
            )).toEqual({
                status: 1, 
                dates: { stateDateObject}
            })

        })

        const stateDatePeriodObject = setInitialDateState("datePeriod")

        it("and dates attribute is equal to stateDatePeriodObject", () => {

            expect(selectedDateReducer(
                { status: "empty", dates: {} }, 
                selectedDateAction.init("stateDatePeriodObject", "datePeriod")
            )).toEqual({
                status: 1, 
                dates: { stateDatePeriodObject}
            })

        })

        const stateDateTimeObject = setInitialDateState("dateTime")

        it("and dates attribute is equal to stateDateTimeObject", () => {

            expect(selectedDateReducer(
                { status: "empty", dates: {} }, 
                selectedDateAction.init("stateDateTimeObject", "dateTime")
            )).toEqual({
                status: 1, 
                dates: { stateDateTimeObject}
            })

        })

        const stateDateTimePeriodObject = setInitialDateState("dateTimePeriod")

        it("and dates attribute is equal to stateDateTimePeriodObject", () => {

            expect(selectedDateReducer(
                { status: "empty", dates: {} }, 
                selectedDateAction.init("stateDateTimePeriodObject", "dateTimePeriod")
            )).toEqual({
                status: 1, 
                dates: { stateDateTimePeriodObject}
            })

        })

        const stateTimeObject = setInitialDateState("time")

        it("and dates attribute is equal to stateTimeObject", () => {

            expect(selectedDateReducer(
                { status: "empty", dates: {} }, 
                selectedDateAction.init("stateTimeObject", "time")
            )).toEqual({
                status: 1, 
                dates: { stateTimeObject}
            })

        })

        const stateTimePeriodObject = setInitialDateState("timePeriod")

        it("and dates attribute is equal to stateTimePeriodObject", () => {

            expect(selectedDateReducer(
                { status: "empty", dates: {} }, 
                selectedDateAction.init("stateTimePeriodObject", "timePeriod")
            )).toEqual({
                status: 1, 
                dates: { stateTimePeriodObject}
            })

        })

    })

    describe("Should set", () => {

        const type = "dateTimePeriod"
        const stateDateTimePeriodObject = setInitialDateState(type)
        const initialState = { status: 1, dates: { dateTimePeriod : stateDateTimePeriodObject } }

        it("Day", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setDay(43, "dateTimePeriod", "start")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setDay(20, "dateTimePeriod", "start")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "pending", 
                    type,
                    calendar: { day: 20, month: false, year: false, hour: false, minute: false },
                    start: { day: "20", month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setDay(8, "dateTimePeriod", "end")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "selected", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: "08", month: false, year: false, hour: false, minute: false }
                }}
            })

        })

        it("Month", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setMonth(20, "dateTimePeriod", "start")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setMonth(3, "dateTimePeriod", "start")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: 3, year: false, hour: false, minute: false },
                    start: { day: false, month: "03", year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setMonth(8, "dateTimePeriod", "end")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "selected", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: "08", year: false, hour: false, minute: false }
                }}
            })

        })

        it("Year", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setYear(20, "dateTimePeriod", "start")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setYear(2000, "dateTimePeriod", "start")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: false, year: 2000, hour: false, minute: false },
                    start: { day: false, month: false, year: "2000", hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setYear(2020, "dateTimePeriod", "end")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "selected", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: "2020", hour: false, minute: false }
                }}
            })

        })

        it("Hour", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setHour(32, "dateTimePeriod", "start")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setHour(9, "dateTimePeriod", "start")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: 9, minute: false },
                    start: { day: false, month: false, year: false, hour: "09", minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setHour(20, "dateTimePeriod", "end")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "selected", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: "20", minute: false }
                }}
            })

        })

        it("Minute", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setMinute(72, "dateTimePeriod", "start")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setMinute(9, "dateTimePeriod", "start")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: 9 },
                    start: { day: false, month: false, year: false, hour: false, minute: "09" },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setMinute(20, "dateTimePeriod", "end")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "selected", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: "20" }
                }}
            })

        })

        it("CalendarDay", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarDay(43, "dateTimePeriod")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarDay(20, "dateTimePeriod")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: 20, month: false, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

        })

        it("CalendarMonth", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarMonth(20, "dateTimePeriod")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarMonth(3, "dateTimePeriod")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: 3, year: false, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

        })

        it("CalendarYear", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarYear(20, "dateTimePeriod")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarYear(2000, "dateTimePeriod")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: false, year: 2000, hour: false, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

        })

        it("CalendarHour", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarHour(32, "dateTimePeriod")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarHour(9, "dateTimePeriod")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: 9, minute: false },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

        })

        it("CalendarMinute", () => {

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarMinute(72, "dateTimePeriod")
            )).toEqual(initialState)

            expect(selectedDateReducer(
                initialState, 
                selectedDateAction.setCalendarMinute(9, "dateTimePeriod")
            )).toEqual({
                status: 1, 
                dates: { dateTimePeriod: { 
                    status: "default", 
                    type,
                    calendar: { day: false, month: false, year: false, hour: false, minute: 9 },
                    start: { day: false, month: false, year: false, hour: false, minute: false },
                    end: { day: false, month: false, year: false, hour: false, minute: false }
                }}
            })

        })

    })

})