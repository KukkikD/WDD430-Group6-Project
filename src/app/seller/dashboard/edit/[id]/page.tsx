import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProductById } from '@/app/lib/data'; // 🧠 build this function
import Form from './form'; // 🧠 move form component to client

export const metadata: Metadata = {
  title: 'Edit Product',
};

// ✅ Server Component: Fetch product by ID and pass it to client Form
export default async function Page(context: { params: { id: string } }) {
  const { params } = context; // ✅ destructure params here
  // ✅ params is directly accessible (not a Promise)
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound(); // ❌ if not found -> show 404 page
  }

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {/* ✅ Pass product object to Form component */}
      <Form product={product} />
    </main>
  );
}
