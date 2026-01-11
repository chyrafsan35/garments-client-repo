import React from 'react';
import bannerTex1 from '../../../assets/hero-pattern1.png'
import bannerTex2 from '../../../assets/hero-pattern2.png'
import { NavLink } from 'react-router';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

import navyHoodie from '../../../assets/navy_blue_hoodie.png';
import whiteHoodie from '../../../assets/white_hoodie.png';
import grayHoodie from '../../../assets/gray_hoodie.png';
import orangeHoodie from '../../../assets/orange_hoodie.png';


const Banner = () => {

    const slides = [
        { id: 1, image: navyHoodie, title2: 'Panther', title1: 'Navy', color: '#3B1E54' },
        { id: 2, image: whiteHoodie, title2: 'Angel', title1: 'White', color: '#FCFAFA' },
        { id: 3, image: grayHoodie, title2: 'American', title1: 'Gray', color: '#6B7280' },
        { id: 4, image: orangeHoodie, title2: 'Ethnic', title1: 'Orange', color: '#E36220' }
    ];

    return (
        <div className='relative w-full min-h-[500px] md:h-[70vh] overflow-hidden'>

            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-10 h-full w-full">
                <div className='col-span-1 md:col-span-6 bg-primary h-full w-full'></div>
                <div className='col-span-1 md:col-span-4 bg-white h-full w-full'></div>
            </div>

            <div
                className='absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center mix-blend-luminosity opacity-30 z-10 pointer-events-none'
                style={{ backgroundImage: `url(${bannerTex1})` }}
            ></div>

            <div className="relative z-20 grid grid-cols-1 md:grid-cols-10 w-full h-full">

                <div className='col-span-1 md:col-span-6 flex items-center py-12 md:px-20'>
                    <div className="text-white text-center md:text-left w-full">
                        <h1 className="text-xl md:text-5xl font-extrabold leading-tight">
                            DRESS UP . WIN BIG<br />
                            <span className="text-secondary">SHOP REAL</span>
                        </h1>
                        <div className="mt-6 space-y-1 text-sm md:text-lg opacity-90">
                            <p>Step into style your ultimate fashion destination</p>
                            <p>Upgrade your wardrobe with our trendy casual dress</p>
                            <p>All your styles curated just for you</p>
                        </div>

                        <div className="mt-8">
                            <NavLink
                                to='all-product'
                                className='inline-block px-4 py-2 bg-white text-sm text-primary font-semibold rounded-sm hover:bg-gray-100 transition-all shadow-xl'
                            >
                                Shop Now
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 md:col-span-4 flex items-center justify-center p-8 md:p-10'>
                    <div className="w-full h-[350px] md:h-[500px] py-10">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{ delay: 2800 }}
                            speed={1200}
                            pagination={{ clickable: true }}
                            loop={true}
                            className="h-full"
                        >
                            {slides.map(slide => (
                                <SwiperSlide key={slide.id}>
                                    {({ isActive }) => (
                                        <div className="h-full w-full flex items-center justify-center p-4 relative">

                                            <div className='absolute inset-0 flex justify-center gap-4 pointer-events-none overflow-hidden'>
                                                <AnimatePresence mode='wait'>
                                                    {isActive && (
                                                        <div className="flex gap-4 items-center justify-center">
                                                            <motion.p
                                                                initial={{ x: -300, y: -500, opacity: 0 }}
                                                                animate={{ x: window.innerWidth < 768 ? -130 : -230, y: 0, opacity: 1 }}
                                                                exit={{ x: -300, y: -500, opacity: 0 }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    ease: [0.16, 1, 0.3, 1], 
                                                                    delay: 0.3 
                                                                }}
                                                                className={`  text-transparent font-pacifico [writing-mode:vertical-rl] rotate-180 text-6xl md:text-8xl drop-shadow-lg`}
                                                                style={{ WebkitTextStroke: `2px ${slide.color}` }}
                                                            >
                                                                {slide.title2}
                                                            </motion.p>

                                                            <motion.p
                                                                initial={{ x: 300, y: 500, opacity: 0 }}
                                                                animate={{ x: window.innerWidth < 768 ? 150 : 250, y: 0, opacity: 1 }}
                                                                exit={{ x: 300, y: 500, opacity: 0 }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    ease: [0.16, 1, 0.3, 1],
                                                                    delay: 0.1
                                                                }}
                                                                className={`  font-pacifico [writing-mode:vertical-rl] rotate-180 text-6xl md:text-8xl drop-shadow-lg`}
                                                                style={{ color: slide.color }}
                                                            >
                                                                {slide.title1}
                                                            </motion.p>
                                                        </div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <motion.img
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={isActive ? { scale: 1, opacity: 1 } : {}}
                                                transition={{ duration: 0.8 }}
                                                src={slide.image}
                                                alt="product"
                                                className='relative max-h-full max-w-full object-contain drop-shadow-2xl z-10'
                                            />
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;