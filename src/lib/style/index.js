import styled from "styled-components";
import homeIcoDarkMode from "../assets/home-darkMode.png" 
import homeIcoLightMode from "../assets/home-lightMode.png" 
import arrowIcoDarkMode from "../assets/arrow-darkMode.png" 
import arrowIcoLightMode from "../assets/arrow-lightMode.png" 
import moveIcoDarkMode from "../assets/move-darkMode.png"
import moveIcoLightMode from "../assets/move-lightMode.png"


/**
 * Contains navigator theme 
 * @example "return light"
 */
export const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

/**
 * @typedef {object} style 
 * @description Provides the color, the background-color and the calendar icons corresponding to the theme 
 * @property {function} adviceColor - Provides advice message font color 
 * @property {function} backgroundColor - Provides background color 
 * @property {function} color - Provides font color
 * @property {object} colors - Store advice, dark, error, light and defaults fonts colors 
 * @property {function} errorColor - Provides error message font color 
 * @property {object} icons - Store icons  
 * @property {object} page - Store page font and background colors 
 * @property {function} setColors - Set font colors : dark and light theme, advice and error message
 */
export const style = {

    /**
     * Provides advice message font color 
     * @memberof style 
     * @function
     * @returns {string} adviceColor
     */
    adviceColor: () => style.colors.advice ?? style.colors.default.advice,

    /**
     * Provides background color  
     * @memberof style 
     * @function 
     * @returns {string} backgroundColor
     */
    backgroundColor: () => style.colors[theme] ? style.colors[theme] : style.colors.default[theme],

    /**
     * Provides font color  
     * @memberof style 
     * @function 
     * @returns {string} color 
     */
    color: () => style.colors.light ? style.colors[theme === "light" ? "dark" : "light"] 
                : style.colors.default[theme === "light" ? "dark" : "light"],

    /**
     * Store advice, dark, error, light and defaults fonts colors 
     * @memberof style 
     * @property {string} advice - advice font color 
     * @property {string} dark - font color use for dark theme 
     * @property {string} error - error font color 
     * @property {string} light - font color use for ligth theme 
     * @property {object} default - contains colors to use if they have not been defined by the user. 
     */
    colors: {
        advice: undefined,
        dark: undefined, 
        error: undefined,
        light: undefined, 
        default: { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E"}
    },

    /**
     * Provides error message font color  
     * @memberof style 
     * @function
     * @returns {string}
     */
    errorColor: () => style.colors.error ?? style.colors.default.error,

    /**
     * Store icons 
     * @memberof style 
     * @property {function} arrow - Provide arrow icon 
     * @property {function} home - Provide home icon  
     * @property {function} move - Provide move icon  
     */
    icons: {

        /**
         * Provides arrow icon
         * @returns {string}
         */
        arrow: () => theme === "light" ? arrowIcoLightMode : arrowIcoDarkMode, 
        
        /**
         * Provides home icon
         * @returns {string}
         */
        home: () => theme === "light" ? homeIcoLightMode : homeIcoDarkMode,
        
        /**
         * Provides move icon
         * @returns {string}
         */
        move: () => theme === "light" ? moveIcoLightMode : moveIcoDarkMode
    },

    /**
     * Store page font and background colors  
     * @memberof style 
     * @property {function} color - Provide font color
     * @property {function} bgColor - Provide background color 
     */
    page: {
        color: () => style.color(),
        bgColor: () => style.backgroundColor()
    },

    /**
     * Set font colors : dark and light theme, advice and error message  
     * @memberof style 
     * @param {string} dark 
     * @param {string} light 
     * @param {string | boolean} advice 
     * @param {string | boolean} error 
     */
    setColors: ({dark, light, advice = false, error = false}) => {
        style.colors.dark = dark  
        style.colors.light = light 
        if(advice){ style.colors.advice = advice }
        if(error){ style.colors.error = error }
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
    color: ${(props) => (props.$color) };
    font-size: smaller;
`

export const CalendarBox = styled.div`
    overflow: hidden;
    display: flex;
    &.date-ctn div:not(.show) {
        padding: 0;
        overflow: hidden;
        opacity: 0;
        transform: scaleX(0);
        margin: 0 -130px;
        transform-origin: left;
    }
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
    &.time-period{
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
            margin-left: 5px;
            @media(max-width : 499px){ 
                margin-top: -15px;
            }
            @media(min-width : 500px){ 
                margin-top: 7px;
            }
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
        @media (max-width : 499px){
            justify-content: center;
        };
        @media (min-width : 500px){
            justify-content: flex-start;
            flex-direction: column;
            max-width: 115px;
            height: 320px;
            margin-left: 30px
        };
        &:not(.time-period) {
            div.time-separator{
                margin-top: -7px;
                align-items: center;
            }
            div:not(.time-select) { height : 100%; }
        };
    `)}
}
`

export const DatePickerContainer = styled.div``

export const DatePickerInput = styled.input`
    text-align: center;
    border: 1px solid;
    padding: 5px;
    margin: 1%;
    border-radius: 3px;
    background-color: ${(props) => ( props.$backgroundColor )};
    color: ${(props) => (props.$color) };
    width: ${(props) =>  props.$long ? (`130px`) : (`95px`) }
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
                return `overflow: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #383F51 #DDDBF1;`
            default: 
                return `
                    flex-direction: column;`;

        }
    }}
`

export const DialogBox = styled.div`
    left: 0px;
    right: 0px;
    display: ${(props) => ( props.$isDisplay ? `flex` : `none`)};
    position: ${(props) => ( props.$isModal ? `absolute` : `relative`)};
    background-color: ${(props) => ( props.$backgroundColor )};
    color: ${(props) => (props.$color) };
    ${(props) => 
        props.$name === "hrnet-dp-modal" && (`
        text-align: center;
        border-radius: 5px;
        box-shadow: 2px 2px 3px gray;
        padding: 25px;
        overflow: hidden;
        z-index: 9;
        width: max-content;
        height: max-content;
        margin: -100px auto 0;
    `)};
    ${(props) => props.$longSize ? (`
        @media (max-width : 499px){
            flex-direction: column;
        }
    `) : (`
        &:not(.hrnet-dp-error){ max-width: 270px; }
    `)};
`

export const ErrorBox = styled.div`
    color: ${(props) => (props.$color) };
    margin: 1% auto;
    width: 50%;
    min-width: 250px;
    max-width: 350px;
`

export const TimeSelectorPage = styled.div`
    background-color: ${style.page.bgColor};
    color: ${style.page.color};
    padding: 2%;
` 