import React, {
  useCallback, useEffect, useState
} from 'react'
import clsx from 'clsx'
import styles from './navbar.module.sass'
import {
  Link, useLocation  
} from 'react-router-dom'

import {
  Swiper, SwiperSlide 
} from 'swiper/react'
import {
  Navigation 
} from 'swiper/modules'

import 'swiper/css/navigation'
import 'swiper/css'
import 'swiper/css/pagination'

const linkList = [{
  name: '偷吃蛋糕',
  to: '/eatCake',
}, {
  name: '狗狗動畫',
  to: '/dog',
}, {
  name: '黑夜切換城市',
  to: '/city',
}, {
  name: '黑夜切換大笨鐘',
  to: '/bigBen',
}, {
  name: '字串資料處理練習',
  to: '/stringHandle',
}, {
  name: '小怪物 loading 頁(GSAP)',
  to: '/monsterLoading',
}, {
  name: '摩斯密碼',
  to: '/morseCode',
}, {
  name: 'webSocket 聊天室',
  to: '/webSocketChat',
}, {
  name: '購物清單',
  to: '/shoppingOrder',
}, {
  name: 'canvas 城堡',
  to: '/castleAnim',
}, {
  name: '九宮格畫布座標',
  to: '/coordinate',
}, {
  name: '物理球效果',
  to: '/ball',
}, {
  name: '貪吃蛇遊戲',
  to: '/snake',
}]

export default function Navbar() {
  const location = useLocation()

  console.log('location.pathname',location.pathname)

  const [swiper, setSwiper] = useState(null)

  useEffect(() => {
    let findPathIndex = 0
    
    linkList.forEach((cur, index) => {
      if (location.pathname === cur.to) {
        findPathIndex = index
      }
    }, [])

    if(swiper) swiper.slideTo(findPathIndex)
  }, [linkList, location, swiper])

  return (
    <div className={styles.navbar}>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        navigation={{
          prevEl: '#prevBtn',
          nextEl: '#nextBtn',
        }}
        modules={[Navigation]}
      >
        {linkList.map((link, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link
              to={link.to}
              className={clsx(styles.link, location.pathname === `${link.to}` && styles.active)}>
              {link.name}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <a id={'prevBtn'} className={styles.swiperButton}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H10.75V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12Z" fill="#1C274C"></path> <path d="M10.75 18C10.75 18.3034 10.5673 18.5768 10.287 18.6929C10.0068 18.809 9.68417 18.7449 9.46967 18.5304L3.46967 12.5304C3.32902 12.3897 3.25 12.1989 3.25 12C3.25 11.8011 3.32902 11.6103 3.46967 11.4697L9.46967 5.46969C9.68417 5.25519 10.0068 5.19103 10.287 5.30711C10.5673 5.4232 10.75 5.69668 10.75 6.00002V18Z" fill="#1C274C"></path> </g></svg>
      </a>
      <a id={'nextBtn'} className={clsx(styles.swiperButton, styles.swiperNextBtn)}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H10.75V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12Z" fill="#1C274C"></path> <path d="M10.75 18C10.75 18.3034 10.5673 18.5768 10.287 18.6929C10.0068 18.809 9.68417 18.7449 9.46967 18.5304L3.46967 12.5304C3.32902 12.3897 3.25 12.1989 3.25 12C3.25 11.8011 3.32902 11.6103 3.46967 11.4697L9.46967 5.46969C9.68417 5.25519 10.0068 5.19103 10.287 5.30711C10.5673 5.4232 10.75 5.69668 10.75 6.00002V18Z" fill="#1C274C"></path> </g></svg>
      </a>
    </div>
  )
}