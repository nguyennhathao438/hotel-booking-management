import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomManager from "./pages/RoomManager.jsx";
<<<<<<< HEAD
import store from "./storages/store";
import { Provider } from "react-redux";

=======
>>>>>>> 8073ad60180736bb716b2d7ab6ae03f290d4ba37
import "./App.css";
// Trang chủ
function Home() {
    return (
        <div className="p-4">
            <h1 className="text-4xl font-hotel text-blue-700">Hotel Booking</h1>
            <h2 className="font-sans">Welcome to our website</h2>
            <h1 className="text-3xl font-bold text-red-400">Đã cài tailwind</h1>
        </div>
    );
}
function App() {
    return (
        
        <BrowserRouter>
            {/* Menu điều hướng */}
            <nav className="flex gap-4 p-4 bg-gray-200">
                <Link to="/" className="text-blue-500 hover:underline">Trang chủ</Link>
                <Link to="/hotel" className="text-blue-500 hover:underline">Hotel</Link>
                <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập</Link>
                <Link to="/register" className="text-blue-500 hover:underline">Đăng ký</Link>
                <Link to="/rooms" className="text-blue-500 hover:underline">Quản lý phòng</Link>
            </nav>

            {/* Chỉ render route */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotel" element={<Hotel />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rooms" element={<RoomManager />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
