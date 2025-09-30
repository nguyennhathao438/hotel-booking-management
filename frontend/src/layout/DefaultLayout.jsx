import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { RoomContextProvide } from "../components/RoomContext";
function DefaultLayout(){
    return (
        <>
        <RoomContextProvide >
        <Header></Header>
        <Outlet></Outlet>
        </RoomContextProvide >
        </>
    )
}
export default DefaultLayout;