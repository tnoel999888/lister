import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
};

/* eslint-disable */
if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./App", renderApp);
}
/* eslint-enable */

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
