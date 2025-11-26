import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";

export default function ImageSlider({ sliders }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const styleSlider = {
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${sliders[currentIndex]?.imgUrl ?? ""})`,
        objectFit: "cover",
    };

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0,-50%)",
        left: "20px",
        fontSize: "30px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "50%",
        padding: "5px",
    };

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0,-50%)",
        right: "20px",
        fontSize: "30px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "50%",
        padding: "5px",
    };

    const dotsContainerStyles = {
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: "10px",
        width: "100%",
        gap: "8px",
        zIndex: 2,
    };

    const dotsChange = (index) => setCurrentIndex(index);

    const createDots = () =>
        sliders.map((_, index) => (
            <FaCircle
                key={index}
                onClick={() => dotsChange(index)}
                style={{
                    fontSize: "12px",
                    cursor: "pointer",
                    color: index === currentIndex ? "#FFD700" : "rgba(255,255,255,0.5)",
                    transition: "all 0.2s",
                }}
            />
        ));

    const goToNext = () => {
        const isLast = currentIndex === sliders.length - 1;
        setCurrentIndex(isLast ? 0 : currentIndex + 1);
    };

    const goToBack = () => {
        const isFirst = currentIndex === 0;
        setCurrentIndex(isFirst ? sliders.length - 1 : currentIndex - 1);
    };

    return (
        <div style={styleSlider}>
            <div style={leftArrowStyles} onClick={goToBack}>
                <FaChevronLeft />
            </div>
            <div style={rightArrowStyles} onClick={goToNext}>
                <FaChevronRight />
            </div>
            <div style={dotsContainerStyles}>{createDots()}</div>
        </div>
    );
}
