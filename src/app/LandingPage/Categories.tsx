'use client';
import Image from 'next/image';

const categories = ["Ceramics", "Knitting", "Woodwork", "Jewelry"];

export default function Categories() {
  return (
    <section className="bg-white py-12 px-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Categories</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-gray-100 p-4 rounded shadow-md w-32 text-center hover:bg-yellow-100 transition"
          >
            <Image
              src="/placeholder.png" //put the route of the real picture instead of this file.
              alt={cat}
              width={128} //(width px)
              height={80} //(height px)
              className="w-full h-20 object-cover mb-2 rounded"
            />
            <p className="font-medium text-green-900">{cat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
