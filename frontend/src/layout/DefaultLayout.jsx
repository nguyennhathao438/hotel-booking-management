import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { ContextProvide } from "../components/RoomContext";
function DefaultLayout() {
    return (
        <>
           <ContextProvide>
      <div className="min-h-screen flex flex-col">

        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

        <Toaster position="top-right" />
      </div>
    </ContextProvide>
        </>
    )
}
export default DefaultLayout;