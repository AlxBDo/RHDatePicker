[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) 
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com) 
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) 


# RHDatePicker 

A library of React components created using `create-react-app` to make secure and customizable date picker.

![ScreenShot](https://alxbdo.github.io/RHDatePicker/src/img/darkTheme.png)

![ScreenShot](https://alxbdo.github.io/RHDatePicker/src/img/lightTheme.png)

RHDatePicker is a time picker displaying a label and an html input as well as a clickable calendar. 
 * It manages dates, times and periods. 
 * Input value can be retrieved in number, string, array or Date object format. 
 * It retrieves the language and the theme defined to navigator in order to apply the input and output format as well as the colors used.
 

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


#### 3.3.1 Example 

For use, only "inputId" and "label" parameters are required. By default, "valueFormat" attribute is "number" and "type" attribute is "dateTime". 

Input value can be retrieved using input id or name (equal to "inputId" argument), or a custom event function (see "eventFunction" argument). If "type" argument is a period (datePeriod, dateTimePeriod or timePeriod), a second input is generated. Its name and id correspond to "inputId" argument with the addition of the suffix "-end" (ex: "myInputId-end").

Below is an example implementation of the RHDatePicker component. You can also see other examples in [src/lib/examples/](https://alxbdo.github.io/RHDatePicker/src/lib/example) .

`import DatePicker from "rh-date-picker/dist/component/datePicker"`

`<DatePicker` 

`   inputId={"myInputId"}` 

`   label={"my label text"}` 

`   deadlines= {{ max: 2022-02-02, min: 2020-01-01 }}` 

`   type={"dateTimePeriod"}` 

`   eventFunction={{ onBlur: myFunction() }}` 

`   valueFormat={"dateObject"}`

` />`


#### 3.3.2 Parameters 

Below is the list of parameters accepted by the DatePicker component : 


* inputId 
    * {string} : accepts alphanumeric characters and hyphen 
    * REQUIRED 


* deadlines 
    * {object} : contains min and max attributes 
    * optional 
    * example : { max: 2022-02-02, min: 2020-01-01 } 


* label 
    * {string} : accepts alphanumeric characters, hyphen, space and apostrophe 
    * REQUIRED 


* eventFunction
    * {object} : contains function to apply to events. Input value is passed as first argument of custom event function
    * optional 
    * example : { onChange: myCustomOnChangeFunction, onChange: myCustomOnClickFunction, onBlur: myCustomOnBlurFunction } 


* htmlClass 
    * {object} : contains classes to apply to the container, to the input and to the error message 
    * optional 
    * example : { container: "container-class", input: "input-class", error: "error-class" }


* valueFormat 
    * {string} : output format of DatePicker input value. 
    * accept : "array", "dateObject", "number", "string" 
    * default value : "number" 
    * optional 


* type 
    * {string} : define input type to generate 
    * accept : "date", "datePeriod", "dateTime", "dateTimePeriod", "time", "timePeriod" 
    * default value : "dateTime" 
    * optional 


* colors 
    * {object} : define colors used by component 
    * default value : { dark: "#302f2f", light: "#f2f2ef"}
    * optional 
    * example : { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E"}  


#### 3.3.3 Documenation

The documentation can be viewed by following the link below : [documentation](https://alxbdo.github.io/RHDatePicker/docs/index.html)