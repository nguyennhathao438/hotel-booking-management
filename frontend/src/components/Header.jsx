import logo from "../assets/img/logo.jpg"

function Header() {
  return (
    <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-3 font-sans">
      {/* Logo */}
      <img src={logo} alt="logo" className="w-12 h-auto object-contain" />

      {/* Menu */}
      <div className="flex gap-8">
        <div className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">HOME</div>
        <div className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">ROOMS</div>
        <div className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">SPA</div>
        <div className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">CONTACTS</div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <div className="px-5 py-2 rounded-full font-bold cursor-pointer border-2 border-white text-white transition-colors duration-300 hover:bg-white hover:text-[#4b2e1f]">
          LOGIN
        </div>
        <div className="px-5 py-2 rounded-full font-bold cursor-pointer bg-[#4b2e1f] text-white border-2 border-[#4b2e1f] transition-colors duration-300 hover:bg-white hover:text-[#4b2e1f]">
          SIGNUP
        </div>
      </div>
    </div>
  )
}

export default Header
