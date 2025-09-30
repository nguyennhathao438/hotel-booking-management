import logo from "../../assets/img/logo.jpg"
function Header() {
    return (
        <>
            <div className="flex justify-between items-center px-10 py-2 bg-[#d2b48c] border-b-2 border-[#a57c50] font-sans ">
                <img src={logo} alt="" className="w-10 h-auto object-contain" />

                <div className="flex gap-6 ">
                    <div className="font-bold text-[#4b2e1f] cursor-pointer transition-transform duration-200 hover:text-white hover:scale-105">HOME</div>
                    <div className="font-bold text-[#4b2e1f] cursor-pointer transition-transform duration-200 hover:text-white hover:scale-105">ROOMS</div>
                    <div className="font-bold text-[#4b2e1f] cursor-pointer transition-transform duration-200 hover:text-white hover:scale-105">SPA</div>
                    <div className="font-bold text-[#4b2e1f] cursor-pointer transition-transform duration-200 hover:text-white hover:scale-105">CONTACTS</div>
                </div>

        
                <div className="flex gap-4">
                    <div className="px-5 py-2 rounded-full font-bold cursor-pointer border-2 border-[#4b2e1f] text-[#4b2e1f] transition-colors duration-300 hover:bg-[#4b2e1f] hover:text-white">
                        LOGIN
                    </div>
                    <div className="px-5 py-2 rounded-full font-bold cursor-pointer bg-[#4b2e1f] text-white border-2 border-[#4b2e1f] transition-colors duration-300 hover:bg-white hover:text-[#4b2e1f]">
                        SIGNUP
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header