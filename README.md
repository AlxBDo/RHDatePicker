[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) 
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com) 
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) 


# RHDatePicker 

A library of React components created using `create-react-app` to make secure and customizable date picker.

![ScreenShot](https://alxbdo.github.io/RHDatePicker/src/img/PeriodInput.png)

![ScreenShot](https://alxbdo.github.io/RHDatePicker/src/img/Calendar.png)

RHDatePicker is a time picker displaying a label and an html input as well as a clickable calendar. 
 * It manages dates, times and periods. The input value can be retrieved in number, string, array or Date object format. 
 * It retrieves the language and the theme defined by the browser in order to apply the input and output format as well as the colors used.
 

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


### 3.2 Installation

Run the following command:
`npm i rh-date-picker`


### 3.3 Use 


#### 3.3.1 Example 

Below is an example implementation of the RHDatePicker component. You can also see the demo in the src/lib/examples/ directory.

`import DatePicker from "rh-date-picker/dist/component/datePicker"`

`<DatePicker inputId={"myInputId"} label={"my label text"} deadlines= {{ max: 2022-02-02, min: 2020-01-01 }} type={"dateTimePeriod"} eventFunction={{ onblur: myCheckFunction() }} />`


#### 3.3.2 Parameters 

Below is the list of parameters accepted by the DatePicker component : 

- inputId {string} : accepts alphanumeric characters and hyphen 
- deadlines {object} : contains min and max attributes
- label {string} : accepts alphanumeric characters, hyphen, space and apostrophe
- eventFunction {object} : contains function to apply to events
- htmlClass {object} : contains classes to apply to the container, to the input and to the error message
- valueFormat {string} : output format of DatePicker input value - Accept : "array", "dateObject" = Date(), "number", "string"
- type {string} : define input type to generate - Accept : "date", "datePeriod", "dateTime", "dateTimePeriod", "time", "timePeriod"
- colors {object} : define colors used by component


#### 3.3.3 Documenation

The documentation can be viewed by following the link below : [documentation](https://alxbdo.github.io/RHDatePicker/docs/index.html)