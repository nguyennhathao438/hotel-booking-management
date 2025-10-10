import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";  // Font Awesome
import { FaCircle, FaRegCircle } from "react-icons/fa"; // icon tròn đầy và tròn rỗng


export default function ImageSlider({ sliders }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderStyles = {
        height: "100%",
        position: "relative",
    }
    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${sliders[currentIndex].imgUrl})`,
    };
    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0,-50%)",
        left: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    }
    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0,-50%)",
        right: "32px",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    }
    const goToBack = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === sliders.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    const dotsStyles = {
        fontSize:"12px",
        cursor:"pointer",
        margin:"0 3px"
    }
    const dotsContainerStyles = {
        display: "flex",
        paddingTop:"4px",
        width: "100%",
        justifyContent: "center",
    }
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }
    return (
        <div style={sliderStyles}>
            <div onClick={goToBack} style={leftArrowStyles}> <FaChevronLeft /> </div>
            <div onClick={goToNext} style={rightArrowStyles}> <FaChevronRight /> </div>
            <div style={slideStyles} ></div>
            <div style={dotsContainerStyles}>
                {sliders.map((slide, slideIndex) => (
                    <div onClick={()=>goToSlide(slideIndex)} key={slideIndex} ><FaCircle style={dotsStyles} /></div>
                ))}
            </div>
        </div>
    );
}