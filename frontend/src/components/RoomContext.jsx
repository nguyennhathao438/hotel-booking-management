import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import api from "../api";
import ApiService from "../service/apiService";
ContextProvide.propTypes = {
    children: PropTypes.node.isRequired,
};

const Context = createContext();

function ContextProvide({ children }) {
    const [adults, setAdults] = useState("1 Adults");
    const [kids, setKids] = useState("0 Kids");
    const [total, setTotal] = useState(0);
    const today = new Date();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const [checkInDate,setCheckInDate] = useState(today);
    const [checkOutDate,setCheckOutDate] = useState(tomorrow);
    const [province,setProvince] = useState("Thành phố Hà Nội");

    useEffect(() => {
        setTotal(Number(adults[0]) + Number(kids[0]));
    }, [adults, kids]);

    const handleClick = (e) => {
        e.preventDefault();
    };

    return (
        <Context.Provider value={{ province,setProvince,checkInDate,setCheckInDate,checkOutDate,setCheckOutDate,adults, setAdults, kids, setKids, total, handleClick, }}>
            {children}
        </Context.Provider>
    );
}
export { ContextProvide, Context };
