import React from "react";
import { DatePicker } from "..";
import "./style.css"

const App = () => {

    // contain event function param
    const eventFunction = {
        onChange: (value) => {
            let weekdayCtnDisplay = "none"
            if(value){
                weekdayCtnDisplay = "block"
                const inputValue = value.split("-")
                document.getElementById("test-weekday").textContent = new Intl.DateTimeFormat(
                    'en-US', {weekday: 'long'}).format(new Date(inputValue[0], inputValue[1]-1, inputValue[2]))
            }
            document.getElementById("weekday-ctn").style.display = weekdayCtnDisplay
        },
        onClick: () => document.getElementById("weekday-ctn").style.display = "none"
    }

    // contain html class param
    const BDHtmlClass = {container: "birthdate-ctn", error: "birthdate-err"}
    
    return (
        <div id="examples-ctn">
            <h1>Date Picker Component Example</h1>
            <div id="example1" >
                <h2>What was the day of the week you were born ?</h2>
                <DatePicker 
                    inputId={"birthdate-ipt"} 
                    label={"Please indicate your birthdate"} 
                    eventFunction={eventFunction} 
                    htmlClass={BDHtmlClass} 
                />
                <p id="weekday-ctn">You were born on a <span id="test-weekday"></span></p>
            </div>
        </div>
    )
};

export default App;