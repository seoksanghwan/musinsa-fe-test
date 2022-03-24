import React from "react";
import ReactDOM from "react-dom";
import App from "page/App";
import 'styles/index.scss';
import { Provider } from "mobx-react";
import stores from "stores";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// ServiceWorker
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
