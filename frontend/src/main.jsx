import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import App from "./App.jsx";
import DashBoard from "./componentadmin/DashBoard.jsx";

createRoot(document.getElementById("root")).render  (
  <StrictMode>
    {/* <Register/> */}
    <DashBoard/>
    </StrictMode>
);
