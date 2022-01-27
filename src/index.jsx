import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import store from "./lib/utils/store"
import App from "./lib/examples/App";

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
);
