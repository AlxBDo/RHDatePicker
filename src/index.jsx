/**
 * @name RHDatePicker 
 * @author Alexandre Bidaud
 * 
 * @file RHDatePicker is a time picker displaying a label and an html input as well as a clickable calendar. 
 * It manages dates, times and periods. The input value can be retrieved in number, string, array or Date object format. 
 * It retrieves the language and the theme defined by the browser in order to apply the input and output format as well as the colors used.
 */

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import store from "./lib/store"
import App from "./lib/examples/App";

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
);
