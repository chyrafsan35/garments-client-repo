import React from 'react';
import bannerText1 from '../../assets/hero-pattern1.png';

const Contact = () => {
    return (
        <div class="min-h-screen bg-gray-50 font-sans">

            <div class="bg-gradient-to-r from-primary to-[#6a3f97] py-20 px-6 text-center text-white relative ">

                <div
                    className='absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center mix-blend-luminosity opacity-30 z-10 pointer-events-none'
                    style={{ backgroundImage: `url(${bannerText1})` }}
                ></div>

                <div className="z-20 relative">
                    <h1 class="text-4xl font-bold mb-2">Get In Touch</h1>
                    <p class="text-purple-200">Have a question or want to visit? We're here to help.</p>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-6 -mt-10 pb-20 relative z-30">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div class="lg:col-span-1 space-y-6">
                        <div class="bg-white p-6 rounded-2xl shadow-md border-l-4 border-cyan-400">
                            <div class="flex items-center gap-4">
                                <div class="bg-cyan-50 p-3 rounded-full text-cyan-600 text-xl">📞</div>
                                <div>
                                    <h4 class="font-bold text-[#3b1e5a]">Call Us</h4>
                                    <p class="text-gray-600 text-sm">+880 1919-635953</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-600">
                            <div class="flex items-center gap-4">
                                <div class="bg-purple-50 p-3 rounded-full text-purple-600 text-xl">✉️</div>
                                <div>
                                    <h4 class="font-bold text-[#3b1e5a]">Email Us</h4>
                                    <p class="text-gray-600 text-sm">mrcplabon@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl shadow-md border-l-4 border-cyan-400">
                            <div class="flex items-center gap-4">
                                <div class="bg-cyan-50 p-3 rounded-full text-cyan-600 text-xl">📍</div>
                                <div>
                                    <h4 class="font-bold text-[#3b1e5a]">Visit Office</h4>
                                    <p class="text-gray-600 text-sm">House #00, Road #00, Sector #00, Uttara, Dhaka.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-[#3b1e5a] p-6 rounded-2xl shadow-md text-white">
                            <h4 class="font-bold mb-4">Follow Our Styles</h4>
                            <div class="flex gap-4">
                                <a href="#" class="bg-white/10 p-2 rounded hover:bg-white/20 transition">FB</a>
                                <a href="#" class="bg-white/10 p-2 rounded hover:bg-white/20 transition">IG</a>
                                <a href="#" class="bg-white/10 p-2 rounded hover:bg-white/20 transition">WA</a>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                        <h3 class="text-2xl font-bold text-primary mb-6">Send a Quick Message</h3>
                        <form action="#" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 outline-none transition" />
                                <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 outline-none transition" />
                            </div>
                            <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 outline-none transition" />
                            <textarea rows="6" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 outline-none transition"></textarea>

                            <button type="submit" class="bg-primary text-white font-bold py-4 px-10 rounded-xl hover:bg-purple-800 transition shadow-lg w-full md:w-auto">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;