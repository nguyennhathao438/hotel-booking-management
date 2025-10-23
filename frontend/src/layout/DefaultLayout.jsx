import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { RoomContextProvide } from "../components/RoomContext";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
function DefaultLayout(){
    return (
        <>
        <RoomContextProvide >
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <Toaster position="top-right" />
        </RoomContextProvide >
        </>
    )
}
export default DefaultLayout;