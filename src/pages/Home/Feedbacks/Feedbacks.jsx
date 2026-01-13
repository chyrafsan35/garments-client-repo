import React, { useState, useEffect } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from '../../../components/ReviewCard/ReviewCard';

const Feedbacks = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/feedbacks.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <div className='py-8 text-[#1A1A1A] overflow-hidden'>
            <h2 className='text-center font-semibold text-xl pb-4'>Customer Feedbacks</h2>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                
                slidesPerView={1.2}
                coverflowEffect={{
                    rotate: 30, 
                    stretch: '25%',
                    depth: 150,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: false, 
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                
                breakpoints={{
                    
                    640: {
                        slidesPerView: 2,
                        coverflowEffect: {
                            rotate: 20,
                            depth: 150,
                            modifier: 1,
                        }
                    },
                    
                    1024: {
                        slidesPerView: 3.5, 
                        coverflowEffect: {
                            rotate: 30,
                            stretch: 10,
                            depth: 200,
                            modifier: 1,
                        }
                    }
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper py-10" 
            >
                {reviews.map(data => (
                    <SwiperSlide key={data.id}>
                        <ReviewCard data={data}></ReviewCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Feedbacks;