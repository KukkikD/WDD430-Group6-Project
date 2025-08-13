import { Product, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/app/shop/components/ProductCard";
import { get } from "http";

//interface for the seller data
interface SellerProfile extends User {
    products: Product[];
    imageUrl?: string; // Add imageUrl property to match usage
}


// Function to get the seller's profile data
async function getSellerData(id: string): Promise<SellerProfile | null > {

    const baseUrl = process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "http://localhost:3000";
    
    try {
        const res = await fetch(`${baseUrl}/api/seller/${id}`, {
            cache: 'no-store'
        });
        if(!res.ok) {
            return null;
        }

        return res.json();

    }catch (error) {
        console.error("Error fetching seller data:", error);
        return null;
    }

}


// The page is a server component that fetches the seller's data and displays it
export default async function SellerProfilePage( { params }: { params: { id: string} }) {
    const seller = await getSellerData(params.id);

    if(!seller) {
        return (
            <div className="text-center py-20 px-4">
                <h1 className="text-2x1 font-bold">Seller Not Found</h1>
                <p className="text-gray-600 mt-2">We couldn't find the seller you're looking for.</p>
                <Link href="/shop" className="text-purple-600 hover:underline mt-4 inline-block">
                    Back to Shop
                </Link>
            </div>

        );
    }


    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:-px-8 py-8 md:py-12">
                <header className="bg-white rounder-x1 shadow-sm p-6 md:p-8 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-purple-200">
                        <Image 
                            src={seller.imageUrl || '/images/sellers/anna.png'}
                            alt= {seller.name || 'Seller Avatar'}
                            fill
                            style = {{ objectFit: 'cover'}}
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{seller.name}</h1>
                        <p className="">{seller.bio || "This seller has not provided a bio."}</p>
                    </div>
                </header>
                {/*Seller Products*/}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{seller.name} Products</h2>
                    {seller.products && seller.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {seller.products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm">
                            <p>No products found for this seller.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}