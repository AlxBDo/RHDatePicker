import styled from "styled-components";

import homeIcoDarkMode from "./assets/home-darkMode.png" 
import homeIcoLightMode from "./assets/home-lightMode.png" 
import arrowIcoDarkMode from "./assets/arrow-darkMode.png" 
import arrowIcoLightMode from "./assets/arrow-lightMode.png" 
import moveIcoDarkMode from "./assets/move-darkMode.png"
import moveIcoLightMode from "./assets/move-lightMode.png"
import CalendarSelect from "./component/CalendarSelect";

export const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

/**
 * Provides the color, the background-color and the calendar icons corresponding to the theme
 */
export const style = {

    adviceColor: () => style.colors.advice ?? style.colors.default.advice,

    backgroundColor: () => style.colors[theme] ? style.colors[theme] : style.colors.default[theme],

    color: () => style.colors.light ? style.colors[theme === "light" ? "dark" : "light"] 
                : style.colors.default[theme === "light" ? "dark" : "light"],

    colors: {
        advice: undefined,
        dark: undefined, 
        error: undefined,
        light: undefined, 
        default: { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E"}
    },

    errorColor: () => style.colors.error ?? style.colors.default.error,

    icons: {
        arrow: () => theme === "light" ? arrowIcoLightMode : arrowIcoDarkMode, 
        home: () => theme === "light" ? homeIcoLightMode : homeIcoDarkMode,
        move: () => theme === "light" ? moveIcoLightMode : moveIcoDarkMode
    },

    page: {
        color: theme === "light" ? "#1e1e1e" : "#eaeaea",
        bgColor: theme === "dark" ? "#1e1e1e" : "#eaeaea"
    },

    setColors: (dark, light) => {
        style.colors.dark = dark  
        style.colors.light = light
    }
}

const clickable = `cursor: pointer;
                    &:hover {
                        background-color: ${style.color()};
                        color: ${style.backgroundColor()};
                        border-radius: 22px;
                        text-shadow: 0px -1px 1px ${theme === "dark" ? "black" : "lightgrey"};
                        box-shadow: inset 0px 0px 3px ${theme === "dark" ? "black" : "lightgrey"};
                    }`


export const AdviceBox = styled.p`
    color: ${style.adviceColor()};
    font-size: smaller;
`

export const CalendarBox = styled.div`
    overflow: hidden;
    display: flex;
    ${(props) => (
        props.$name === "option" ? `
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 45px; 
        padding-bottom: 10px;
        ` : (`
        height: 265px;
        `)
    )}
`

export const CalendarList = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    ${(props) => ( props.$name === "month-days" 
        ? `height: 225px;` : props.$name === "weekdays" && `
        background-color: ${theme === "dark" ? `rgba(0, 0, 0, 0.2)` : `rgba(255, 255, 255, 0.2)`};
        border-radius: 5px;
        & ${CalendarListItem} { 
            opacity: 0.5; 
            &:hover { opacity: 1 }
        };
        &:hover {
            background-color: ${theme === "dark" ? `rgba(0, 0, 0, 0.5)` : `rgba(255, 255, 255, 0.5)`};
        };
        `
    )}
`

export const CalendarListItem = styled.li`
    list-style: none;
    width: 14%;
    line-height: 35px;
    &.selected-day {
        color: black;
        background-color: gray;
        font-weight: bold;
    }
    ${(props) => (
        props.$type === "clickable" && clickable
    )}
`

export const CalendarOption = styled.span`
    cursor: pointer;
    ${(props) => (
        props.$type === "icon" ? (`
            content: url(${props.$name === "home" ? style.icons.home() : style.icons.arrow() }); 
            width: 24px; 
            height: 24px;
            ${props.$name === "previous-month" && (`transform: rotate(180deg);`)}
        `) : props.$type === "move-icon" ? (`
            content: url(${style.icons.move() }); 
            width: 25px; 
            height: 25px;
            ${props.$name === "more" && (`transform: rotate(180deg);`)}
        `) : (`
            padding: 5px 10px;
            ${clickable}
            ${props.$name === "month" && (`width: 85px;`)}
        `)
    )}
`

export const CalendarSection = styled.section`
    text-align: center;
    display: flex;
    flex-direction: ${(props) => ( props.$flexDirection || `column` )};
    flex-wrap: ${(props) => ( props.$flexWrap || `nowrap` )};
    overflow: hidden;
    max-height: 320px;
    &:first-of-type {
        width: 270px;
    }
    div.time-separator {
        align-self: center;
        font-size: xxx-large;
    }
    div:not(.time-select) {
        display: flex;
        flex-direction: row;
    };
    &:not(.time-period) div.time-separator{
        margin-top: -7px;
        margin-left: -7px;
    };
    &.time-period{
        justify-content: flex-start;
        flex-direction: column;
        max-width: 115px;
        height: 320px;
        overflow: hidden;
        div:not(.time-select, .minutes-ctn) {
            height: 50%;
            overflow: hidden;
            flex-wrap: wrap;
            justify-content: center;
            align-items: baseline;
            align-content: baseline;
        };
        div.time-separator {
            margin-top: 10px;
            margin-left: 5px;
        }
        p {
            width: 100%;
            margin: 0px auto;
            padding: 0;
            height: 15px;
            font-size: small;
            border-radius: 5px;
            ${theme === "dark" ? (`
            color: gray;
            background-color: rgba(0, 0, 0, 0.1);
            `) : (`
            color: lightgray;
            background-color: rgba(255, 255, 255, 0.1);
            `)}
        };
    };
    ${(props) => ( props.$name === "timeSection" && `
        margin-left: 30px
    `)}
}
`

export const DatePickerContainer = styled.div`
    position: relative;
`

export const DateSelect = styled.div`   
    display: flex;
    margin: 0; 
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    transition: all 250ms ease-in-out;
    transform-origin: right;
    &:not(.time-select) { 
        width: 270px;
        span {
            margin: auto;
            padding: 10px;
            ${clickable}
        }
    };
    &.time-select {
        span.selected-option {
            font-size: xx-large;
            border-top: 1px solid;
            border-bottom: 1px solid;
            font-weight: bold;
            margin: 10px auto;
            &:hover { cursor: s-resize;}
        }
        span:not(.selected-option) {
            opacity: 0.25;
            &:hover{
                text-shadow: 2px 2px 2px black;
                font-size: larger;
                cursor: pointer;
                opacity: 1;
            }
        }
        span:not(:first-of-type, :nth-of-type(4), :nth-of-type(6), :last-of-type, .selected-option) { 
            font-size: x-small; 
            &:hover { margin: -6.5px auto; }
        }
        span:nth-of-type(4):hover, span:nth-of-type(6):hover {
            margin: -2.5px auto;
        }
    }
    ${(props) => {
        switch(props.$name){
            case "hours":  
                return `
                    flex-direction: column;
                    width: 60px;`
            case "minutesUni": case "minutesUniEnd" : case "minutesDec": case "minutesDecEnd" :  
                return `
                flex-direction: column;
                width: 30px`
            case "month": 
                return null ;
            case "time-select": 
                return `
                    flex-direction: column;
                    span:not(:nth-of-type(4), :nth-of-type(6), .selected-option) {
                    font-size: x-small;
                }
                `
            case "year": 
                return `overflow: auto;`
            default: 
                return `
                    flex-direction: column;`;

        }
    }}
`

export const DialogBox = styled.div`
    display: ${(props) => ( props.$isDisplay ? `flex` : `none`)};
    position: ${(props) => ( props.$isModal ? `absolute` : `relative`)};
    background-color: ${(props) => ( props.$backgroundColor )};
    color: ${(props) => (props.$color) };
    &.date-select { left: 22% ; }
    &.date-time-select { left: 8%; }
    ${(props) => props.$name === "hrnet-dp-modal" && (`
        text-align: center;
        border-radius: 5px;
        box-shadow: 2px 2px 3px gray;
        padding: 25px;
        overflow: hidden;
        z-index: 9;
        top: -125px;
    `)}
`

export const ErrorBox = styled.div`
    color: ${style.errorColor()};
    margin: 5% auto;
    padding: 15px 10px;
    border: 1px dashed;
    border-radius: 10px;
`

export const TimeSelectorPage = styled.div`
    background-color: ${style.page.bgColor};
    color: ${style.page.color};
    padding: 2%;
`