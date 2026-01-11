import React from 'react';
import bannerTex1 from '../../../assets/hero-pattern1.png'
import bannerTex2 from '../../../assets/hero-pattern2.png'
import { NavLink } from 'react-router';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import navyHoodie from '../../../assets/navy_blue_hoodie.png';
import whiteHoodie from '../../../assets/white_hoodie.png';
import grayHoodie from '../../../assets/gray_hoodie.png';

const Banner = () => {

    const slides = [
        { id: 1, image: navyHoodie },
        { id: 2, image: whiteHoodie },
        { id: 3, image: grayHoodie }
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

                <div className='col-span-1 md:col-span-6 flex items-center px-6 py-12 md:px-20'>
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
                            autoplay={{ delay: 2500 }}
                            pagination={{ clickable: true }}
                            loop={true}
                            className="h-full"
                        >
                            {slides.map(slide => (
                                <SwiperSlide key={slide.id}>
                                    <div className="h-full w-full flex items-center justify-center p-4">
                                        <img
                                            src={slide.image}
                                            alt="product"
                                            className='max-h-full max-w-full object-contain drop-shadow-2xl'
                                        />
                                    </div>
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