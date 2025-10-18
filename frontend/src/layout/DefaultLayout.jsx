import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { ContextProvide } from "../components/RoomContext";
function DefaultLayout() {
    return (
        <>
            <ContextProvide>
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
                <Toaster position="top-right" />
            </ContextProvide>
        </>
    )
}
export default DefaultLayout;