import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from '../../../components/ReviewCard/ReviewCard';

const Feedbacks = () => {
    const [reviews, setReviews] = useState([]);
    const reviewData = fetch('../../../../public/feedbacks.json').then(res => res.json()).then(data => setReviews(data))
    console.log(reviewData)
    
    return (
        <div className='py-[50px] text-[#1A1A1A] bg-white'>
            <h2 className='text-center py-4 font-semibold text-xl'>Customer Feedbacks</h2>
            <>
                <Swiper
                    // loop={true}
                    // effect={'coverflow'}
                    // grabCursor={true}
                    // centeredSlides={true}
                    // slidesPerView={3}
                    // coverflowEffect={{
                    //     rotate: 30,
                    //     stretch: '50%',
                    //     depth: 200,
                    //     modifier: 1,
                    //     scale: 0.75,
                    //     slideShadows: true,
                    // }}
                    // autoplay={{
                    //     delay: 2000,
                    //     disableOnInteraction: false,
                    // }}
                    // pagination={true}
                    // modules={[EffectCoverflow, Pagination, Autoplay]}
                    // className="mySwiper"
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={4}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: '25%',
                        depth: 150,
                        modifier: 1,
                        scale: 0.75,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {
                        reviews.map(data =>
                            <SwiperSlide>
                                <ReviewCard key={data.id} data={data}></ReviewCard>
                            </SwiperSlide>)
                    }

                </Swiper>

            </>
        </div>
    );
};

export default Feedbacks;