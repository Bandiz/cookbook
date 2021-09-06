import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RecipesProvider } from "./RecipesContext";
import { StylesProvider } from "@material-ui/core";

ReactDOM.render(
    <StylesProvider injectFirst>
        <RecipesProvider>
            <App />
        </RecipesProvider>
    </StylesProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
