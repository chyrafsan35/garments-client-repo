import React from 'react';
import bannerText1 from '../../assets/hero-pattern1.png';

const Help = () => {
    return (
        <div class="min-h-screen bg-gray-50 font-sans">

            <div class="bg-gradient-to-r from-primary to-[#6a3f97] py-20 px-6 text-center text-white relative overflow-hidden">

                <div
                    className='absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center mix-blend-luminosity opacity-30 z-10 pointer-events-none'
                    style={{ backgroundImage: `url(${bannerText1})` }}
                ></div>

                <h1 class="text-4xl md:text-5xl font-bold mb-4 relative z-10">Help & Support</h1>
                <p class="text-purple-200 text-lg max-w-2xl mx-auto relative z-10">
                    Find all the information you need about shipping, payments, and our policies.
                </p>
            </div>

            <div class="max-w-6xl mx-auto px-6 -mt-10 mb-16 relative z-20">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div class="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-cyan-400">
                        <div class="text-cyan-500 text-3xl mb-4">🚚</div>
                        <h3 class="text-xl font-bold text-[#3b1e5a] mb-4">Shipping Info</h3>
                        <ul class="space-y-3 text-gray-600 text-sm">
                            <li class="flex justify-between"><span>Inside Dhaka:</span> <strong>2-3 Days</strong></li>
                            <li class="flex justify-between"><span>Outside Dhaka:</span> <strong>4-5 Days</strong></li>
                            <li class="flex justify-between border-t pt-2"><span>Charge:</span> <strong>60 - 120 BDT</strong></li>
                        </ul>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-purple-600">
                        <div class="text-purple-600 text-3xl mb-4">💳</div>
                        <h3 class="text-xl font-bold text-[#3b1e5a] mb-4">Payment Methods</h3>
                        <p class="text-gray-600 text-sm mb-4">We accept all major local payment gateways for your convenience.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">bKash</span>
                            <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Nagad</span>
                            <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">Rocket</span>
                            <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">COD</span>
                        </div>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-cyan-400">
                        <div class="text-cyan-500 text-3xl mb-4">🔄</div>
                        <h3 class="text-xl font-bold text-[#3b1e5a] mb-4">Easy Returns</h3>
                        <ul class="list-disc list-inside space-y-2 text-gray-600 text-sm">
                            <li>7-day exchange policy.</li>
                            <li>Product must have original tags.</li>
                            <li>No return on used products.</li>
                            <li>Defective items are replaced free.</li>
                        </ul>
                    </div>

                </div>

                <div class="mt-12 bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between border border-purple-100">
                    <div class="mb-6 md:mb-0">
                        <h2 class="text-2xl font-bold text-[#3b1e5a]">Still have questions?</h2>
                        <p class="text-gray-500">Our support team is ready to help you via Call or WhatsApp.</p>
                    </div>
                    <div class="flex gap-4">
                        <a href="tel:+880123456789" class="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/80 transition shadow-lg">
                            Call Support
                        </a>
                        <a href="#" class="border-2 border-primary text-[#3b1e5a] px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;