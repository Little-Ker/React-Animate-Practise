import React from 'react'
import Grid from '@mui/material/Grid'
import '../App.css'

import {
  Swiper, SwiperSlide 
} from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import '../index.css'

// import required modules
import {
  Pagination, Navigation, Autoplay, FreeMode
} from 'swiper/modules'

const Navbar = () => {
  return (
    <div style={{marginTop: '10rem'}}>
      <Swiper
        autoplay={{
          delay: 1,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
        speed={3000}
        freeMode={true}

        slidesPerView={1}
        // slidesPerGroup={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Autoplay, FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className={'slide'}>Slide 1Slide 1Slide 1Slide 1</SwiperSlide>
        <SwiperSlide className={'slide'}>Slide 2</SwiperSlide>
        <SwiperSlide className={'slide'}>Slide 3</SwiperSlide>
        <SwiperSlide className={'slide'}>Slide 4</SwiperSlide>
        <SwiperSlide className={'slide'}>Slide 5</SwiperSlide>
        <SwiperSlide className={'slide'}>Slide 6</SwiperSlide>
        <SwiperSlide className={'slide'}>Slide 7</SwiperSlide>
        {/* <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </div>
  )
}

export default Navbar