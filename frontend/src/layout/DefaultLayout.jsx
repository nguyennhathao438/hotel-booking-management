import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { RoomContextProvide } from "../components/RoomContext";
import { Toaster } from "react-hot-toast";
function DefaultLayout(){
    return (
        <>
        <RoomContextProvide >
        <Header></Header>
        <Outlet></Outlet>
        <Toaster position="top-right" />
        </RoomContextProvide >
        </>
    )
}
export default DefaultLayout;