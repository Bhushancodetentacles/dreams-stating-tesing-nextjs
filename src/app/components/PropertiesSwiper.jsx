import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; 
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";


const PropertiesSwiper = ({images, propertyTypeName}) => {
  return (
    <div className="w-full  relative">
      <Swiper
        spaceBetween={10}         
        slidesPerView={1}           
        autoplay={{ delay: 3000 }}  
        loop={true}                
        pagination={{
          clickable: true,        
        }}
        modules={[Autoplay, Pagination]}  
        className="h-[494px]"             
      >
        {images && images.length > 0 && images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
            <h5 className="badge">{propertyTypeName}</h5>

              <Image
                src={image.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                height={50}
                width={50}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertiesSwiper;
