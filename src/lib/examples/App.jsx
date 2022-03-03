import React from "react";
import DatePicker from "../component/datePicker";
import { TimeSelectorPage, style } from "../style"
import "../style/style.css"

const App = () => {

    // contain event function param
    const eventFunction = {
        onBlur: (value) => {
            let weekdayCtnDisplay = "none"
            if(value){
                weekdayCtnDisplay = "block"
                let date = false
                const lang = navigator.language
                if(value instanceof Date){ date = value
                } else {
                    let inputValue = Array.isArray(value) ? value : value.split(value.indexOf("-") > 0 ? "-" : ".")
                    date = new Date(inputValue[lang === "en" ? 0 : 2], inputValue[1]-1, inputValue[lang === "en" ? 2 : 0])
                }
                document.getElementById("test-weekday").textContent = new Intl.DateTimeFormat(
                    'en-US', {weekday: 'long'}).format(date)
            }
            document.getElementById("weekday-ctn").style.display = weekdayCtnDisplay
        },
        onClick: () => document.getElementById("weekday-ctn").style.display = "none", 
    }
    // contain event function param
    const onBlurFunction = {
        onBlur: (value) => {
            if(value){ document.getElementById("string-date").textContent = value
            } else { document.getElementById("string-date").textContent = "" }
        } 
    }

    // contain event function param
    const evenFunctionPeriod = { 
        periodValues: { start: false, end: false }, 
        getStringValue: (date) => new Intl.DateTimeFormat(
            undefined, 
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            .format(date),
        duration: () => Math.ceil(Math.abs(evenFunctionPeriod.periodValues.end - evenFunctionPeriod.periodValues.start) / (1000 * 60 * 60 * 24)),
        onBlur : (e) => {
            const periodMsgBox = document.getElementById("vacation-period")
            if(!evenFunctionPeriod.periodValues.start || evenFunctionPeriod.periodValues.end){ 
                periodMsgBox.textContent = ""
                evenFunctionPeriod.periodValues.start = e 
                evenFunctionPeriod.periodValues.end = false 
            } else {  
                evenFunctionPeriod.periodValues.end = e 
                periodMsgBox.textContent = `Your next vacation is scheduled from ${evenFunctionPeriod.getStringValue(evenFunctionPeriod.periodValues.start)} 
                to ${evenFunctionPeriod.getStringValue(evenFunctionPeriod.periodValues.end)}. Your leave will last ${evenFunctionPeriod.duration()} days`
            }
        } 
    }

    // contain html class param
    const BDHtmlClass = {container: "example-ctn", error: "example-err"}

    const deadlines = {min: "01-01-2022", max: "17-02-2022"}

    const colors= { dark: "#383F51", light: "#DDDBF1", advice: "#A6ECE0", error: "#F9627D" }
    style.setColors(colors)

    return (
        <TimeSelectorPage>
            <h1>Date Picker Component Example</h1>
            <div id="example1" className="example" >
                <h2>What was the day of the week you were born ?</h2>
                <DatePicker 
                    inputId={"birthdate-ipt"} 
                    label={"Please indicate your birthdate"} 
                    deadlines={ deadlines }
                    eventFunction={eventFunction} 
                    htmlClass={BDHtmlClass} 
                    type={"date"}
                    valueFormat={"array"} 
                    colors={colors}
                />
                <p id="weekday-ctn">You were born on a <span id="test-weekday"></span></p>
            </div>
            <div id="example2" className="example" >
                <h2>Choose a date and time to get it to string format</h2>
                <DatePicker 
                    inputId={"string-date-ipt"} 
                    label={"Choose date and time"} 
                    eventFunction={onBlurFunction} 
                    htmlClass={BDHtmlClass} 
                    valueFormat={"string"} 
                    colors={colors}
                />
                <p id="string-date"></p>
            </div>
            <div id="example3" className="example" >
                <h2>Choose the dates of your next vacation</h2>
                <DatePicker 
                    inputId={"holidays-period-ipt"} 
                    label={"Choose end and start date of your next vacation"} 
                    htmlClass={BDHtmlClass} 
                    type={"dateTimePeriod"} 
                    eventFunction={evenFunctionPeriod} 
                    valueFormat={"dateObject"} 
                    colors={colors}
                />
                <p id="vacation-period"></p>
            </div>
        </TimeSelectorPage>
    )
};

export default App;