// import {useState} from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Banner from "./components/Banner.jsx";
import Home from "./components/Home.jsx";
import HotelInfor from "./components/Hotel.jsx";
function App() {

  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <Home/>
      <HotelInfor/>
    </>
  );
}

export default App;
