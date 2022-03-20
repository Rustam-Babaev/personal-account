import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/rootReducer";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const store = createStore(
  rootReducer,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>
  document.getElementById("root")
);
