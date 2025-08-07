'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@prisma/client';
import { Filters } from './components/Filters';
import { ProductGrid } from './components/ProductGrid';

// --- Componente Principal de la Página ---
export default function ShopPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // --- Estados para el Filtrado ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [price, setPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(500);
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products/list');
                if (!res.ok) throw new Error('Error al cargar los productos.');

                const data: Product[] = await res.json();
                setAllProducts(data);

                const uniqueCategories = ['All', ...Array.from(new Set(data.map(p => p.category)))];
                setCategories(uniqueCategories);

                const maxProductPrice = Math.max(...data.map(p => p.price), 0);
                const initialPrice = maxProductPrice > 0 ? Math.ceil(maxProductPrice) : 500;
                setMaxPrice(initialPrice);
                setPrice(initialPrice);

            } catch (err: any) {
                setError(err.message || 'Ocurrió un error inesperado.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // --- Lógica de Filtrado Combinada ---
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price <= price;
            return matchesCategory && matchesSearch && matchesPrice;
        });
    }, [allProducts, selectedCategory, searchTerm, price]);


    if (isLoading) return <div className="text-center py-20">Cargando productos...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Colección</h1>
                    <p className="text-gray-600">Descubre los tesoros únicos hechos a mano por nuestros artesanos.</p>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Usamos el componente de Filtros y le pasamos el estado y las funciones para manejarlo */}
                    <Filters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        searchTerm={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                        price={price}
                        onPriceChange={(e) => setPrice(Number(e.target.value))}
                        maxPrice={maxPrice}
                    />

                    {/* Usamos el componente ProductGrid, pasándole solo los productos ya filtrados */}
                    <ProductGrid products={filteredProducts} />
                </div>
            </div>
        </div>
    );
}