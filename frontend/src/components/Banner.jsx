import banner2 from "../assets/img/banner2.jpg"
import banner1 from "../assets/img/banner1.jpg"
import banner3 from "../assets/img/banner3.jpg"
import "react-datepicker/dist/react-datepicker.css"
import { useState, useEffect } from "react";
function Banner() {
    const images = [banner1, banner2, banner3]; 
    const [current, setCurrent] = useState(0);

    // Tự động đổi ảnh sau 3 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <div className="relative h-[94vh] w-screen">
            <img className="h-full w-full object-cover" src={images[current]} alt="banner" />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h5 className="text-white text-xl md:text-2xl font-light tracking-[.3em] mb-4 drop-shadow-lg uppercase">
                    Just Enjoy and Relax
                </h5>
                <h1 className="text-white text-4xl md:text-6xl font-serif font-bold leading-tight drop-shadow-xl">
                    Your Luxury Hotel
                </h1>
                <h1 className="text-white text-4xl md:text-6xl font-serif font-bold leading-tight drop-shadow-xl">
                    For Vacation
                </h1>
            </div>
        </div>
    );
}

export default Banner