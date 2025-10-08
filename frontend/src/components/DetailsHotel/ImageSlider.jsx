
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";  // Font Awesome
import { FaCircle, FaRegCircle } from "react-icons/fa"; // icon tròn đầy và tròn rỗng


export default function ImageSlider({ sliders }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const styleSlider = {
        width: "100%",
        height: "100%",
        border: "1px solid",
        position: "relative",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${sliders[currentIndex].imgUrl})`,
        borderRadius: "10px",
        objectFit: "cover",
    }
    // const styles = {
    //     width: "100%",
    //     height: "100%",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundImage: `url(${sliders[currentIndex].imgUrl})`,
    //     borderRadius: "10px",
    //     objectFit: "cover",
    // }
    // const stylesArrowLeft = {
    //     position:"absolute",
    //     top:"50%",
    //     left: "32px",
    //     fontSize:"45px",
    //     transform: "translate(0,-50%)",
    //     zIndex:1,
    //     color:"#fff",
    //     cursor:"pointer"
    // }
    // const stylesArrowRight = {
    //     position:"absolute",
    //     top:"50%",
    //     right: "32px",
    //     fontSize:"45px",
    //     transform: "translate(0,-50%)",
    //     zIndex:1,
    //     color:"#fff",
    //     cursor:"pointer"
    // }
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
    const goToNext = () => {
        const isLastSlide = currentIndex === sliders.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    const goToBack = () => {
        const firstIndex = currentIndex === 0
        const newIndex = firstIndex ? sliders.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }
    const dotsStyles = {
        fontSize: "12px",
        cursor: "pointer",
        margin: "0 3px",
    }
    const dotsContainerStyles = {
        display: "flex",
        paddingTop:"4px",
        width: "100%",
        justifyContent: "center",
        position:"absolute",
        bottom:"-16px"
    }
    const dotsChange =(index)=>{
        setCurrentIndex(index)
    }
    const createDots = () => {
        return sliders.map((slider,index)=>(
            <div onClick={()=>dotsChange(index)} style={dotsStyles} key={index}><FaCircle/></div>
        ))
    }
    return (
        <div style={styleSlider}>
            <div style={leftArrowStyles} onClick={goToBack}><FaChevronLeft /></div>
            <div style={rightArrowStyles} onClick={goToNext}><FaChevronRight /></div>
            <div style={dotsContainerStyles}>
                {createDots()}
            </div>
        </div>
    );
















    // const [currentIndex, setCurrentIndex] = useState(0)
    // const sliderStyles = {
    //     height: "100%",
    //     position: "relative",
    // }
    // const slideStyles = {
    //     width: "100%",
    //     height: "100%",
    //     borderRadius: "10px",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundImage: `url(${sliders[currentIndex].imgUrl})`,
    // };
    // const leftArrowStyles = {
    //     position: "absolute",
    //     top: "50%",
    //     transform: "translate(0,-50%)",
    //     left: "32px",
    //     fontSize: "45px",
    //     color: "#fff",
    //     zIndex: 1,
    //     cursor: "pointer",
    // }
    // const rightArrowStyles = {
    //     position: "absolute",
    //     top: "50%",
    //     transform: "translate(0,-50%)",
    //     right: "32px",
    //     fontSize: "45px",
    //     color: "#fff",
    //     zIndex: 1,
    //     cursor: "pointer",
    // }
    // const goToBack = () => {
    //     const isFirstSlide = currentIndex === 0
    //     const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1
    //     setCurrentIndex(newIndex)
    // }
    // const goToNext = () => {
    //     const isLastSlide = currentIndex === sliders.length - 1
    //     const newIndex = isLastSlide ? 0 : currentIndex + 1
    //     setCurrentIndex(newIndex)
    // }
    // const dotsStyles = {
    //     fontSize:"12px",
    //     cursor:"pointer",
    //     margin:"0 3px"
    // }
    // const dotsContainerStyles = {
    //     display: "flex",
    //     paddingTop:"4px",
    //     width: "100%",
    //     justifyContent: "center",
    // }
    // const goToSlide = (slideIndex) => {
    //     setCurrentIndex(slideIndex)
    // }
    // return (
    //     <div style={sliderStyles}>
    //         <div onClick={goToBack} style={leftArrowStyles}> <FaChevronLeft /> </div>
    //         <div onClick={goToNext} style={rightArrowStyles}> <FaChevronRight /> </div>
    //         <div style={slideStyles} ></div>
    //         <div style={dotsContainerStyles}>
    //             {sliders.map((slide, slideIndex) => (
    //                 <div onClick={()=>goToSlide(slideIndex)} key={slideIndex} ><FaCircle style={dotsStyles} /></div>
    //             ))}
    //         </div>
    //     </div>
    // );
}