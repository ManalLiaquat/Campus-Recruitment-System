import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CustomRoutes from "./Routes/Routes";
import registerServiceWorker from "./registerServiceWorker";

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<CustomRoutes />, document.getElementById("root"));
registerServiceWorker();
