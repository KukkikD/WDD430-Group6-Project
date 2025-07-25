'use client';
import Image from 'next/image';

const categories = ["Ceramics", "Knitting", "Woodwork", "Jewelry"];

export default function Categories() {
  return (
    <section className="bg-white p-3 ">
      <h2 className="text-2xl font-semibold text-left mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-gray-100 p-2 rounded shadow-md text-center hover:bg-yellow-100 transition w-[100%]"
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
