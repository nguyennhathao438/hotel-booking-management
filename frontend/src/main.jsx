import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import App from "./App.jsx";
import store from "./storages/store.js";
import { Provider } from "react-redux";
import { RoomContextProvide } from "./components/RoomContext.jsx";
createRoot(document.getElementById("root")).render(
    <Provider store={store}>  
    <RoomContextProvide>
        <App />
        </RoomContextProvide>
    </Provider>
);

