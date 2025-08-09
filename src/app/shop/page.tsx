'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@prisma/client';
import { Filters } from './components/Filters';
import { ProductGrid } from './components/ProductGrid';

// main component
export default function ShopPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //  State for filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [price, setPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(500);
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products/list');
                if (!res.ok) throw new Error('Error loading products.');

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error('Invalid products data.');
                setAllProducts(data);

                const uniqueCategories = ['All', ...Array.from(new Set(data.map(p => p.category).filter(Boolean)))];
                setCategories(uniqueCategories);

                const maxProductPrice = Math.max(...data.map(p => p.price), 0);
                const initialPrice = maxProductPrice > 0 ? Math.ceil(maxProductPrice) : 500;
                setMaxPrice(initialPrice);
                setPrice(initialPrice);

            } catch (err: any) {
                setError(err.message || 'An unexpected error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // --- Filtering Logic ---
    const filteredProducts = useMemo(() => {
        return (allProducts ?? []).filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price <= price;
            return matchesCategory && matchesSearch && matchesPrice;
        });
    }, [allProducts, selectedCategory, searchTerm, price]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value));


    if (isLoading) return <div className="text-center py-20">Loading products...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    if (filteredProducts.length === 0) return <div className="text-center py-20">No products found.</div>;

    return(
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collection</h1>
                    <p className="text-gray-600">Discover the unique treasures handcrafted by our artisans.</p>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* We use the Filters component and pass the state and functions to handle it */}
                    <Filters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        price={price}
                        onPriceChange={handlePriceChange}
                        maxPrice={maxPrice}
                    />

                    {/* We use the ProductGrid component, passing only the filtered products */}
                    <ProductGrid products={filteredProducts} />
                </div>
            </div>
        </div>
    );
}