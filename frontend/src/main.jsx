
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import store from "./storages/store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routers.jsx";
createRoot(document.getElementById("root")).render(
    <Provider store={store}> 
    <RouterProvider router={router}>
        
            <App />
        </RouterProvider>   
    </Provider>
);

