import styled from "styled-components";

import homeIcoDarkMode from "./assets/home-darkMode.png" 
import homeIcoLightMode from "./assets/home-lightMode.png" 
import arrowIcoDarkMode from "./assets/arrow-darkMode.png" 
import arrowIcoLightMode from "./assets/arrow-lightMode.png" 

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
        home: () => theme === "light" ? homeIcoLightMode : homeIcoDarkMode
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
    display: flex;
    overflow: hidden;
    ${(props) => (
        props.$name === "option" ? `
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: 45px; 
        padding-bottom: 10px;
        ` : (`
        height: 265px;
        width: 1110px;
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
    ${(props) => (
        props.$type === "clickable" && clickable
    )}
`

export const CalendarModal = styled.div`
    display: none;
    text-align: center;
    position: absolute;
    background-color: ${style.backgroundColor()};
    color: ${style.color()};
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
            content: url(${props.$name === "home" ? style.icons.home() : style.icons.arrow() }); 
            width: 24px; 
            height: 24px;
            ${props.$name === "previous-month" && (`transform: rotate(180deg);`)}
        `) : (`
            padding: 5px 10px;
            ${clickable}
            ${props.$name === "month" && (`width: 85px;`)}
        `)
    )}
`

export const DatePickerContainer = styled.div`
    position: relative;
`

export const DateSelect = styled.div`
    display: flex;
    margin: ${(props) => ( props.$name === "days" ? "0" : "0 0 0 45px" )};
    width: 270px; 
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    ${(props) => (
        `${
            props.$name === "year" ? "overflow: auto" 
            : props.$name === "days" && "flex-direction: column" 
        };`
    )}
    span { 
        margin: auto;
        padding: 10px;
        ${clickable}
    }
`

export const DayTable = styled.table`
    td:not(.empty-cell){
        line-height: 35px;
        width: 35px;
        cursor: pointer;
        &:hover{
            background-color: ${style.color()};
            color: ${style.backgroundColor()};
            border-radius: 50px;
        }
    }
`

export const DialogBox = styled.div`
    display: ${(props) => ( props.$isDisplay ? `block` : `none`)};
    position: ${(props) => ( props.$isModal ? `absolute` : `relative`)};
    background-color: ${(props) => ( props.$backgroundColor )};
    color: ${(props) => (props.$color) };
    ${(props) => props.$htmlClass === "hrnet-dp-modal" && (`
    text-align: center;
    border-radius: 5px;
    box-shadow: 2px 2px 3px gray;
    margin-top: 10px;
    flex-direction: column;
    padding: 25px;
    width: 270px;
    overflow: hidden;
    z-index: 9;
    top: -125px;
    margin: 0 10%;
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
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`