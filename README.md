# RHDatePicker 
[![forthebadge](https://alxbdo.github.io/RHDatePicker/src/img/made-with-react.svg)](https://forthebadge.com) 
[![forthebadge](https://alxbdo.github.io/RHDatePicker/src/img/use-react-redux.svg)](https://forthebadge.com)


A library of React components created using `create-react-app` to make secure and customizable date picker.

![ScreenShot](https://alxbdo.github.io/RHDatePicker/src/img/darkTheme.png)

![ScreenShot](https://alxbdo.github.io/RHDatePicker/src/img/lightTheme.png)

RHDatePicker is a time picker displaying a label and an html input as well as a clickable calendar. 
 * It manages dates, times and periods. 
 * Input value can be retrieved in number, string, array or Date object format. 
 * It retrieves the language and the theme defined to navigator in order to apply the input and output format as well as the colors used.


## Table of contents 

* [Author](#1-author)
* [Technologies](#2-technologies)
* [Project](#3-project)
    * [Prerequisites](#31-prerequisites) 
    * [Installation](#32-installation) 
    * [Use](#33-use)
        * [Example](#331-example) 
        * [Parameters](#332-parameters)
            * [colors](#colors) 
            * [deadlines](#deadlines) 
            * [eventFunction](#eventfunction)
            * [htmlClass](#htmlclass)
            * [inputId](#inputid) 
            * [label](#label) 
            * [type](#type) 
            * [valueFormat](#valueformat) 
* [Documentation](#4-documenation) 
* [NPM Package](#5-npm-package)


## 1. Author

Alexandre Bidaud


## 2. Technologies

- JS 
- CSS 
- HTML 
- NodeJs
- React.js 
- React-Redux 
- Styled-components 
- Prop-Type 


## 3. Project

### 3.1 Prerequisites

- [NodeJS (**version 12.18**)](https://nodejs.org/en/)
- [React](https://reactjs.org/) 
- [React-Redux](https://react-redux.js.org/introduction/getting-started) 
- [Redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started) 
- [Styled-components](https://styled-components.com/) 


### 3.2 Installation

Run the following command:
`npm i rh-date-picker`


### 3.3 Use 

For use, only "inputId" and "label" parameters are required. By default, "valueFormat" attribute is "number" and "type" attribute is "dateTime". 

Input value can be retrieved using input id or name (equal to "inputId" argument), or a custom event function (see "eventFunction" argument). If "type" argument is a period (datePeriod, dateTimePeriod or timePeriod), a second input is generated. Its name and id correspond to "inputId" argument with the addition of the suffix "-end" (ex: "myInputId-end").


#### 3.3.1 Example 

Below is an example implementation of the RHDatePicker component. You can also see other examples in src/lib/examples/ .

`import DatePicker from "rh-date-picker/dist/component/datePicker"`

`<DatePicker inputId={"myInputId"} label={"my label text"} />`


#### 3.3.2 Parameters 

Below is the list of parameters accepted by DatePicker component : 

##### inputId 

* {string} : accepts alphanumeric characters and hyphen 
* REQUIRED 


##### deadlines 

* {object} : contains min and max attributes 
* optional 
* example : 

`const myDeadlines = { max: 2022-02-02, min: 2020-01-01 }` 

`<DatePicker inputId={"myInputId"} label={"my label text"} deadlines={ myDeadlines } />` 



##### label 

* {string} : accepts alphanumeric characters, hyphen, space and apostrophe 
* REQUIRED 


##### eventFunction

* {object} : contains function to apply to events. Input value is passed as first argument of custom event function (not for onClick function)
* optional 
* example :  

`const myEventFunction = { onChange: myCustomOnChangeFunction, onClick: myCustomOnClickFunction, onBlur: myCustomOnBlurFunction }` 

`<DatePicker inputId={"myInputId"} label={"my label text"} eventFunction={ myEventFucntion } />` 



##### htmlClass 

* {object} : contains classes to apply to the container, to the input and to the error message 
* optional 
* example :  

`const myHtmlClass = { container: "container-class", input: "input-class", error: "error-class" }` 

`<DatePicker inputId={"myInputId"} label={"my label text"} htmlClass={ myHtmlClass } />` 



##### valueFormat 

* {string} : output format of DatePicker input value.  
* default value : "number" 
* accept : 
    * "array" -> return array contains input value ( [YYYY, MM, DD] ), 
    * "dateObject" -> return an instance of Date, 
    * "number" -> return "YYYY/MM/DD", 
    * "string" -> return date and / or time in local format. Use Intl.DateTimeFormat()
* optional 



##### type 

* {string} : define input type to generate 
* default value : "dateTime" 
* accept : "date", "datePeriod", "dateTime", "dateTimePeriod", "time", "timePeriod" 
* optional 



##### colors 

* {object} : define colors used by component 
* default value : { dark: "#302f2f", light: "#f2f2ef"}
* optional 
* example : 

`const myColors = { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E" }` 

`<DatePicker inputId={"myInputId"} label={"my label text"} colors={ myColors } />`  



## 4 Documenation

The documentation can be viewed by following the link below : [documentation](https://alxbdo.github.io/RHDatePicker/docs/index.html) 


## 5 Npm package 

[See RHDatePicker npm package](https://www.npmjs.com/package/rh-date-picker)
