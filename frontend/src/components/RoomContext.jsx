import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
RoomContextProvide.propTypes = {
  children: PropTypes.node.isRequired,
};

const Context = createContext();

function RoomContextProvide({ children }) {
  const [adults, setAdults] = useState("1 Adults");
  const [kids, setKids] = useState("1 Kids");
  const [total, setTotal] = useState(0);
  const [hotels, setHotels] = useState([]);

  useEffect(()=>{
    const fetchHotel = async() =>{
          const response = await api.get("/hotels/all")
          setHotels(response.data.result)
          console.log(response.data.result)
    }
    fetchHotel();
  },[])


  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  }, [adults, kids]);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <Context.Provider value={{ adults, setAdults, kids, setKids, total, hotels, setHotels, handleClick, }}>
      {children}
    </Context.Provider>
  );
}
export { RoomContextProvide, Context };