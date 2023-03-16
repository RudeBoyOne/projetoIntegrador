import React, { useRef, useState, Component } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

function Pdp_gallery_modal({ imagens }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imagens.map((imagem) => (
          <SwiperSlide>
            <img key={imagem?.id} src={imagem?.url} alt={imagem?.titulo} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {imagens.map((imagem) => (
          <SwiperSlide>
            <img key={imagem?.id} src={imagem?.url} alt={imagem?.titulo} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <img src="https://i.postimg.cc/fW02W6Rm/208-02.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.postimg.cc/3NpnLDcn/208-03.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.postimg.cc/YCtb30fz/208-04.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.postimg.cc/5NBsLLvt/208-05.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
export default Pdp_gallery_modal;
