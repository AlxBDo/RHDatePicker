import React from "react";
import { DatePicker } from "..";
import { TimeSelectorPage, style } from "../style"
import "../style.css"

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
            if(value){
                document.getElementById("string-date").textContent = value
            }
        } 
    }

    // contain html class param
    const BDHtmlClass = {container: "example-ctn", error: "example-err"}
    
    return (
        <TimeSelectorPage>
            <h1>Date Picker Component Example</h1>
            <div id="example1" className="example" >
                <h2>What was the day of the week you were born ?</h2>
                <DatePicker 
                    inputId={"birthdate-ipt"} 
                    label={"Please indicate your birthdate"} 
                    eventFunction={eventFunction} 
                    htmlClass={BDHtmlClass} 
                    valueFormat={"array"}
                />
                <p id="weekday-ctn">You were born on a <span id="test-weekday"></span></p>
            </div>
            <div id="example2" className="example" >
                <h2>Choose a date and get it to string format</h2>
                <DatePicker 
                    inputId={"string-date-ipt"} 
                    label={"Please indicate your birthdate"} 
                    eventFunction={onBlurFunction} 
                    htmlClass={BDHtmlClass} 
                    valueFormat={"string"}
                />
                <p id="string-date"></p>
            </div>
        </TimeSelectorPage>
    )
};

export default App;