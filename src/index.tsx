import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
