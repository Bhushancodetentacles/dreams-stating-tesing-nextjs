import Image from "next/image";
import React, { useState } from "react";

const ImageWithFallback = ({
    src,
    fallbackSrc = "https://via.placeholder.com/50",
    alt = "",
    style = {}, // Allow style as an optional prop
    className = "", // Use className for styling flexibility
}) => {
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc); // Track current image source

    const handleError = (event) => {
        event.currentTarget.onerror = null; // Prevent infinite loop
        event.currentTarget.src = "/images/svg/error-image.svg"; // Use provided fallback or default error image
        setImgSrc(fallbackSrc); // Switch to fallback image
    };

    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            style={style} // Allow inline styles if needed
            onError={handleError}
            height={50}
            width={50}
        />
    );
};

export default ImageWithFallback;
