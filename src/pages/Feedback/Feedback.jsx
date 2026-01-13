import React from 'react';

const Feedback = () => {
    return (
        <div class="min-h-screen bg-gray-50 font-sans pb-12">

            <div class="bg-gradient-to-r from-primary to-[#6a3f97] py-20 px-6 text-center text-white">
                <h1 class="text-3xl md:text-4xl font-bold mb-3">Share Your Experience</h1>
                <p class="text-purple-200 max-w-lg mx-auto">We value your feedback! Let us know how we can improve our products and services.</p>
            </div>

            <div class="max-w-3xl mx-auto px-6 -mt-10">
                <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <form action="#" class="space-y-6">

                        <div class="text-center mb-8">
                            <label class="block text-gray-700 font-semibold mb-3">How would you rate our quality?</label>
                            <div class="flex justify-center gap-2 text-3xl text-gray-300">
                                <button type="button" class="hover:text-yellow-400 transition">★</button>
                                <button type="button" class="hover:text-yellow-400 transition">★</button>
                                <button type="button" class="hover:text-yellow-400 transition">★</button>
                                <button type="button" class="hover:text-yellow-400 transition">★</button>
                                <button type="button" class="text-yellow-400">★</button> </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Feedback Category</label>
                            <select class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 outline-none transition appearance-none bg-no-repeat bg-right pr-10">
                                <option>Product Quality</option>
                                <option>Delivery Speed</option>
                                <option>Customer Service</option>
                                <option>Website Experience</option>
                                <option>Others</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Your Comments</label>
                            <textarea rows="5"  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition"></textarea>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-[#3b1e5a] text-white font-bold py-4 rounded-xl hover:bg-purple-800 transition shadow-lg transform hover:-translate-y-1">
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>

                <p class="text-center text-gray-500 mt-8 text-sm">
                    By submitting, you agree to our <a href="#" class="text-[#3b1e5a] underline font-medium">Terms of Service</a>.
                </p>
            </div>
        </div>
    );
};

export default Feedback;