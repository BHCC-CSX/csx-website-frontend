import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';


// Styles
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css"; // Maybe Remove?
import "./assets/demo/nucleo-icons-page-styles.css";

import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
