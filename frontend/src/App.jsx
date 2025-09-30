import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Hotels from "./components/Hotels.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomManager from "./pages/RoomManager.jsx";
import Home from "./components/Home.jsx"
import "./App.css";
import Header from "./components/Header.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./api.js";
import { login } from "./storages/userSlice.js";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token != null) {
                const response = await api.get("/users/myInfo")
                dispatch(login({
                    avatar: response.data.avatar,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    userId: response.data.userId,
                    roles: response.data.roles,
                }))
            }
        }
        fetchUser();
    }, [dispatch])
    return (
        <BrowserRouter>
            {/* Menu điều hướng */}
            <Header></Header>

            {/* Chỉ render route */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotel" element={<Hotels />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rooms" element={<RoomManager />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
