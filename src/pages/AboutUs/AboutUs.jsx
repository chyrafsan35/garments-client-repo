import React from 'react';
import { Link } from 'react-router';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import rafsan from '../../../src/assets/rafsan3.png'
import bannerText1 from '../../assets/hero-pattern1.png'

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

            <div class="max-w-[1440px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="relative">
                    <div class="w-full h-80 bg-gray-200 rounded-2xl shadow-2xl overflow-hidden relative z-10">
                        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000" alt="Fashion Workshop" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute -bottom-8 -right-10 w-32 h-32 bg-purple-500 opacity-20 rounded-full z-0 opacity-30"></div>
                </div>

                <div class="space-y-6">
                    <h2 class="text-2xl font-bold text-[#3b1e5a]">The Story of Our Craft</h2>
                    <p class="text-gray-600 leading-relaxed">
                        Every great brand starts with a simple 'Why'. For <span class="font-bold text-primary">Taati</span>, it began in the bustling heart of Bangladesh, where fashion is everywhere, but quality is often a luxury.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        We looked at the streets and saw a void—the gap between high-end expensive labels and fast-fashion that loses its soul after one wash. We asked ourselves: Why can't premium craftsmanship be accessible to everyone? <br />
                        With that single question, <span class="font-bold text-primary">Taati</span> was born. We went back to the basics—the threads, the looms, and the hands that create. We chose our name to honor the timeless art of weaving, blending our deep-rooted heritage with the sharp, clean aesthetics of modern global fashion.
                    </p>
                </div>
            </div>

            <div className={`bg-gray-50 mx-auto`}>
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="py-16">
                        <div className="">
                            <p>As we grew, our obsession with detail only deepened. We didn't just look for fabric; we hunted for stories woven into threads. From the breathable cotton of our local fields to the most durable blends, every material is hand-selected to ensure it stands the test of time and weather. For us, a garment is successful only when it feels like a second skin—effortless, comfortable, and remarkably resilient. We believe that true fashion shouldn't just look good in a mirror; it should feel extraordinary against your skin.</p>
                            <br />
                            <p>Beyond the stitches, Taati is a tribute to the hands that build. We take immense pride in working with local artisans and craftsmen, blending their traditional wisdom with our modern design philosophy. By fostering a sustainable and ethical manufacturing environment, we ensure that every piece you wear supports a community of creators. It’s a partnership of passion—where your support helps us keep the age-old spirit of craftsmanship alive in this fast-paced digital world.</p>
                            <br />
                            <p>Today, we stand at the threshold of a new era in fashion. Our journey has just begun, and our vision is clear: to make Taati a global symbol of Bangladeshi excellence. We are constantly innovating, exploring eco-friendly practices, and expanding our horizons to bring you styles that inspire confidence. Whether you are stepping into a boardroom or enjoying a casual weekend, we are here to ensure you do it with grace. Thank you for being a part of our story—we can't wait to see where we go together.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-16 mx-auto text-center">
                <ScrollReveal>
                    <div className='pt-16 max-w-[1440px] mx-auto'>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                Here You Can Find Your True
                            </h2>
                            <h2 className='text-4xl md:text-5xl font-bold text-cyan-500'>
                                Fashion Style
                            </h2>
                            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                                Explore our diverse collection designed for every personality and occasion.
                            </p>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 items-center mx-auto px-5'>

                            {/* Left Content: Categories */}
                            <div className='col-span-1  text-left'>
                                <ScrollReveal direction="left">
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-4 border-l-4 border-cyan-500 pl-3">Collections</h3>
                                        <ul className='space-y-4 text-xl font-semibold text-gray-700 list-none'>
                                            <li className=" flex items-center gap-2">
                                                Men's Casual
                                            </li>
                                            <li className=" flex items-center gap-2">
                                                Women's Ethnic
                                            </li>
                                            <li className=" flex items-center gap-2">
                                                Kids' Comfort
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mt-5">
                                        <p className="text-primary font-medium text-sm uppercase tracking-wider">Limited Time</p>
                                        <h4 className="text-2xl font-black text-gray-800">Up to 35% Off!</h4>
                                        <p className="text-gray-500 text-xs mt-1">On all new arrival items.</p>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Middle Content: Main Image */}
                            <div className='col-span-1 lg:col-span-2 relative group'>
                                <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition">
                                </div>
                                <img
                                    src={rafsan}
                                    alt="Fashion Style"
                                    className='max-w-[300px] mx-auto md:max-w-[600px] relative z-10 w-full h-auto object-cover rounded-3xl transform group-hover:scale-[1.01]  transition duration-500'
                                />
                            </div>

                            {/* Right Content: Features & CTA */}
                            <div className='col-span-1 '>
                                <ScrollReveal direction="right">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600 font-bold">01</div>
                                            <div>
                                                <h4 className="font-bold text-primary">Free Shipping</h4>
                                                <p className="text-gray-500 text-sm">On orders above 1500 BDT.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-100 p-3 rounded-lg text-primary font-bold">02</div>
                                            <div>
                                                <h4 className="font-bold text-primary">Easy Returns</h4>
                                                <p className="text-gray-500 text-sm">7-day hassle-free exchange.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600 font-bold">03</div>
                                            <div>
                                                <h4 className="font-bold text-primary">Secure Payment</h4>
                                                <p className="text-gray-500 text-sm">bKash, Nagad & COD available.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Link to="/all-product" className="block text-center bg-primary text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:bg-[#4d2a75] transition transform active:scale-95">
                                            Explore Collection
                                        </Link>
                                    </div>
                                </ScrollReveal>
                            </div>

                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <div className='bg-gray-50 py-16 mx-auto text-center z-20'>
                <div>
                    <ScrollReveal>
                        <div className='py-16 max-w-[1440px] mx-auto'>
                            <div class=" text-center mb-12">
                                <h2 class="text-2xl font-bold text-primary">What Defines Us</h2>
                                <div class="w-20 h-1 bg-primary mx-auto mt-4"></div>
                            </div>

                            <div class=" px-6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-center ">
                                    <h4 class="text-xl font-bold text-[#3b1e5a] mb-2">Premium Quality</h4>
                                    <p class="text-gray-500 text-sm">We use the finest fabrics to ensure longevity and comfort in every wear.</p>
                                </div>
                                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-center">
                                    <h4 class="text-xl font-bold text-[#3b1e5a] mb-2">Fast Delivery</h4>
                                    <p class="text-gray-500 text-sm">Your fashion shouldn't wait. We ensure quick shipping across Bangladesh.</p>
                                </div>
                                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-center ">
                                    <h4 class="text-xl font-bold text-[#3b1e5a] mb-2">Customer First</h4>
                                    <p class="text-gray-500 text-sm">Our support team is always ready to assist you for a smooth experience.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className='py-16 max-w-[1440px] mx-auto'>
                            <div class=" text-center mb-12">
                                <h2 class="text-2xl font-bold text-primary">Mission & Vision</h2>
                                <div class="w-20 h-1 bg-primary mx-auto mt-4"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Mission Card */}
                                <div className="p-8 bg-purple-50 rounded-2xl border-l-8 border-primary hover:shadow-lg transition">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h4 className="text-2xl font-bold text-primary">Our Mission</h4>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        To redefine casual fashion by blending tradition with modern trends.
                                        We aim to provide premium quality apparel that is accessible to everyone,
                                        ensuring maximum comfort and durability in every stitch.
                                    </p>
                                </div>

                                {/* Vision Card */}
                                <div className="p-8 bg-cyan-50 rounded-2xl border-l-8 border-cyan-400 hover:shadow-lg transition">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h4 className="text-2xl font-bold text-[#3b1e5a]">Our Vision</h4>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        To become a household name in the fashion industry of Bangladesh,
                                        known for our commitment to craftsmanship and style.
                                        We envision taking 'Taati' to a global stage as a symbol of local excellence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div class="py-16 mx-auto text-center">
                <h3 class="text-2xl font-bold text-[#3b1e5a] mb-6">Ready to upgrade your wardrobe?</h3>
                <Link to="/all-product" class="bg-[#3b1e5a] text-white px-10 py-4 rounded-full font-bold hover:bg-purple-800 transition shadow-xl inline-block">
                    Shop Our Collection
                </Link>
                <p>Stats..................</p>
            </div>
        </div>
    );
};

export default AboutUs;