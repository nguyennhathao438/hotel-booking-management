import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

RoomContextProvide.propTypes = {
    children: PropTypes.node.isRequired,
};

const Context = createContext();

function RoomContextProvide({ children }) {
    const [adults, setAdults] = useState("1 Adults");
    const [kids, setKids] = useState("1 Kids");
    const [total, setTotal] = useState(0);
    const [hotels, setHotels] = useState([]);

    // tính tổng số người
    useEffect(() => {
        setTotal(Number(adults[0]) + Number(kids[0]));
    }, [adults, kids]);

    //fetch dữ liệu khách sạn
    useEffect(() => {
        fetch("http://localhost:8081/hotel/hotels")
            .then((res) => res.json())
            .then((data) => setHotels(data))
            .catch((err) => console.error("Lỗi fetch hotels:", err));
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Tổng số người:", total);
    };

    return (
        <Context.Provider value={{ adults, setAdults, kids, setKids, total, hotels, setHotels, handleClick, }}>
            {children}
        </Context.Provider>
    );
}
export { RoomContextProvide, Context };
