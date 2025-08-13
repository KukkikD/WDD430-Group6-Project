'use client';

import { ChangeEvent } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';


interface FilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    searchTerm: string;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    price: number;
    onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
    maxPrice: number;
}

export const Filters = ({
    categories,
    selectedCategory,
    onSelectCategory,
    searchTerm,
    onSearchChange,
    price,
    onPriceChange,
    maxPrice
}: FilterProps) => {
    return (
        <aside className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                    <SlidersHorizontal className="mr-2" />
                    Filters
                </h3>

                {/* Search filters*/}
                <div className="mb-6">
                    <label htmlFor="search" className="block text-sm font-bold text-gray-700 mb-2">Search Product</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by name or description"
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Category filters */}
                <div className='mb-6'>
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category)}
                                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${selectedCategory == category
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {category}
                            </button>

                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Price Range</h4>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={price}
                        onChange={onPriceChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        title="Select price range"
                    />

                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>$0</span>
                        <span>${price}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};