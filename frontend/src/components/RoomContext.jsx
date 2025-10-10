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
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([]);


  useEffect(() => {
    const fetchAllHotel = async () => {
      try {
        const request = await api.get("/hotels/all")
        setHotels(request.data.result)
      } catch (error) {
        console.error("Error when load data :", error);
      }
    }
    fetchAllHotel()
  },[])

  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  }, [adults, kids]);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <Context.Provider value={{ adults, setAdults, kids, setKids, total, hotels, setHotels, rooms, setRooms, images, setImages, handleClick, }}>
      {children}
    </Context.Provider>
  );
}
export { RoomContextProvide, Context };