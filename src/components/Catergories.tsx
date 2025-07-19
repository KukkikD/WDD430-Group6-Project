const categories = ["Ceramics", "Knitting", "Woodwork", "Jewelry"];

export default function Categories() {
  return (
    <section className="bg-white py-10 px-4">
      <h3 className="text-xl font-bold text-center mb-6">Categories</h3>
      <div className="flex justify-center gap-6 flex-wrap">
        {categories.map((cat) => (
          <div key={cat} className="bg-gray-100 p-4 rounded shadow-md w-32 text-center">
            <img
              src="/placeholder.png"
              alt={cat}
              className="w-full h-20 object-cover mb-2"
            />
            <p className="font-medium text-green-900">{cat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
