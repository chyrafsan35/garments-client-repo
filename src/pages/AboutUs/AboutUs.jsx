import React from 'react';
import { Link } from 'react-router';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import rafsan from '../../../src/assets/rafsan3.png'
import bannerText1 from '../../assets/hero-pattern1.png'
import OurStory from '../OurStory/OurStory';

const AboutUs = () => {

    return (
        <div class="min-h-screen bg-white font-sans overflow-hidden">

            <div class="bg-gradient-to-r from-primary to-[#6a3f97] py-20 px-6 text-center text-white relative overflow-hidden">
                <div
                    className='absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center mix-blend-luminosity opacity-30 z-10 pointer-events-none'
                    style={{ backgroundImage: `url(${bannerText1})` }}
                ></div>

                <div className="z-20 relative">
                    <h1 class="text-3xl md:text-4xl font-extrabold mb-4">About Our Journey</h1>
                    <p class="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
                        Redefining casual fashion with quality, comfort, and style since [Year].
                    </p>
                </div>
            </div>

            <OurStory></OurStory>
        </div>
    );
};

export default AboutUs;