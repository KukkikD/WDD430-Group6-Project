'use client';

const categories = ['Ceramics', 'Knitting', 'Woodwork', 'Jewelry'];

export default function Categories() {
  return (
    <section className="py-12 px-8">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
      <div className="flex gap-6 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-5 py-2 border border-gray-400 rounded-full hover:bg-yellow-100 transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
