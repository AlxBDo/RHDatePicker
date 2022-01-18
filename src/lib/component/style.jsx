import styled from "styled-components";

import homeIcoDarkMode from "./assets/home-darkMode.png" 
import homeIcoLightMode from "./assets/home-lightMode.png" 
import arrowIcoDarkMode from "./assets/arrow-darkMode.png" 
import arrowIcoLightMode from "./assets/arrow-lightMode.png" 

/**
 * Provides the color, the background-color and the calendar icons corresponding to the theme
 */
const calendarStyle = {

    backgroundColor: () => calendarStyle.colors[calendarStyle.colors.theme],

    color: () => calendarStyle.colors[calendarStyle.colors.theme === "light" ? "dark" : "light"],

    colors: {
        dark: "#302f2f", 
        light: "#f2f2ef",
        theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    },

    icons: {
        arrow: () => calendarStyle.colors.theme === "light" ? arrowIcoLightMode : arrowIcoDarkMode, 
        home: () => calendarStyle.colors.theme === "light" ? homeIcoLightMode : homeIcoDarkMode
    }
}

export const CalendarBox = styled.div`
    display: flex;
    overflow: hidden;
    ${(props) => (
        props.$name === "option" ? `
        width: 100%;
        justify-content: space-between;
        height: 45px; 
        ` : (`
        height: 265px;
        width: 1110px;
        `)
    )}
`

export const CalendarModal = styled.div`
    display: none;
    text-align: center;
    position: absolute;
    background-color: ${calendarStyle.backgroundColor()};
    color: ${calendarStyle.color()};
    border-radius: 5px;
    box-shadow: 2px 2px 3px gray;
    margin-top: 10px;
    flex-direction: column;
    padding: 25px;
    width: 270px;
    overflow: hidden;
`

export const CalendarOption = styled.span`
    cursor: pointer;
    ${(props) => (
        props.$type === "icon" ? (`
            content: url(${props.$name === "home" ? calendarStyle.icons.home() : calendarStyle.icons.arrow() }); 
            width: 24px; 
            height: 24px;
            ${props.$name === "previous-month" && (`transform: rotate(180deg);`)}
        `) : (`
            ${props.$name === "month" && (`width: 85px;`)}
        `)
    )}
`

export const DatePickerContainer = styled.div`
    position: relative;
`

export const DateSelect = styled.p`
    display: flex;
    margin: 0 0 0 45px;
    width: 270px; 
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    ${(props) => (
        `${props.$name === "year" && "overflow: auto"};`
    )}
    span { 
        cursor: pointer; 
        margin: auto;
        padding: 10px;
        &:hover { 
            background-color: ${calendarStyle.color()};
            border-radius: 10px;
            color: ${calendarStyle.backgroundColor()};
        }
    }
`

export const DayTable = styled.table`
    td:not(.empty-cell){
        line-height: 35px;
        width: 35px;
        cursor: pointer;
        &:hover{
            background-color: ${calendarStyle.color()};
            color: ${calendarStyle.backgroundColor()};
            border-radius: 50px;
        }
    }
`