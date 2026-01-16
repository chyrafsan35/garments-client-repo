import React, { useEffect, useState } from 'react';
import AllProductCard from '../../../components/AllProductCard/AllProductCard';
import Loading from '../../../components/Loading/Loading';
import { IoMdArrowDropleft, IoMdArrowDropright, IoMdSearch } from "react-icons/io";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("price");
    const [order, setOrder] = useState("asc"); // Default order set to asc
    const [searchText, setSearchText] = useState("");
    const limit = 8; // প্রতি পেজে ৮টি প্রোডাক্ট দেখালে গ্রিড সুন্দর দেখায়

    const sortByPrice = (e) => {
        const value = e.target.value;
        if (value === "default") return;
        const [sortField, sortOrder] = value.split('-');
        setSort(sortField);
        setOrder(sortOrder);
        setCurrentPage(0);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(0);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://server-eight-eta-49.vercel.app/products?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setTotalProducts(data.total);
                // সরাসরি data.total ব্যবহার করা ভালো যাতে রি-রেন্ডার কম হয়
                setTotalPage(Math.ceil(data.total / limit));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [currentPage, sort, order, searchText]);

    return (
        <div className='bg-gray-50 min-h-screen pb-12'>
            <div className='max-w-[1440px] mx-auto px-4'>
                {/* Header Section */}
                <header className='text-center py-10'>
                    <h2 className='text-4xl font-bold text-gray-800 mb-2'>Explore Our Collection</h2>
                    <p className='text-gray-500'>Find the best products tailored just for you</p>
                </header>

                {/* Filter & Search Bar */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm mb-10'>
                    {/* Search Input */}
                    <div className="relative w-full md:w-1/3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-xl">
                            <IoMdSearch />
                        </span>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search products..."
                            className="input input-bordered w-full pl-10 focus:outline-primary border-gray-200"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <span className='font-medium text-gray-600 hidden sm:block'>Sort By:</span>
                        <select
                            onChange={sortByPrice}
                            defaultValue="default"
                            className="select select-bordered w-full md:w-48 border-gray-200 focus:outline-primary"
                        >
                            <option value="default" disabled>Price Filtering</option>
                            <option value='price-asc'>Price: Low to High</option>
                            <option value='price-desc'>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <Loading />
                    </div>
                ) : products.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {products.map(product => (
                            <AllProductCard key={product._id} allProducts={product} />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-20'>
                        <h3 className='text-2xl text-gray-400'>No products found matching your search.</h3>
                    </div>
                )}

                {/* Pagination Section */}
                {totalPage > 1 && (
                    <div className='flex justify-center items-center mt-16 gap-2'>
                        <button
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className='btn btn-circle btn-outline btn-sm sm:btn-md border-gray-300 hover:bg-primary hover:text-white'
                        >
                            <IoMdArrowDropleft size={24} />
                        </button>

                        <div className="flex gap-1 overflow-x-auto px-2">
                            {[...Array(totalPage).keys()].map(i => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`btn btn-sm sm:btn-md btn-circle ${i === currentPage ? 'btn-primary shadow-lg' : 'btn-ghost border border-gray-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage + 1 >= totalPage}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className='btn btn-circle btn-outline btn-sm sm:btn-md border-gray-300 hover:bg-primary hover:text-white'
                        >
                            <IoMdArrowDropright size={24} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;