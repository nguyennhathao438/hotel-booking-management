import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

RoomContextProvide.propTypes = {
  children: PropTypes.node.isRequired,
};

const Context = createContext();

function RoomContextProvide({ children }) {
  const [adults, setAdults] = useState("1 Adults");
  const [kids, setKids] = useState("1 Kids");
  const [total, setTotal] = useState(0);
  const [hotels, setHotels] = useState([]);

  const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc1OTE5NjQwNSwiaWF0IjoxNzU5MTkyODA1LCJqdGkiOiI4YjNkZDZmNi02ZTdlLTRjZWMtYTg0Zi1kN2UxZTQwNDNjMTUiLCJzY29wZSI6IiJ9.zzf3BUD74X1svkK00ZqHowCUYz3Mul19ZRtukT_EfQ-q9BnALlKA1FpyXrK6xrqsvZLC1ZXQftwSaSSKKEkT8w"
  useEffect(()=>{
    axios.get("http://localhost:8081/hotel_booking/api/hotels/all",{
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    }).then(res => {
      setHotels(res.data.result)
      console.log(res.data)
    })
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
