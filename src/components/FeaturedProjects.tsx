const products = [
  { name: "Sweaters", price: "$14.95", img: "/placeholder.png" },
  { name: "Earrings", price: "$10.95", img: "/placeholder.png" },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-10 px-4">
      <h3 className="text-xl font-bold text-center mb-6">Featured Products</h3>
      <div className="flex justify-center gap-6 flex-wrap">
        {products.map((p) => (
          <div key={p.name} className="bg-gray-100 p-4 rounded shadow-md w-48">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-32 object-cover mb-2"
            />
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-sm">{p.price}</p>
            <span className="text-xs text-yellow-500">⭐ Rating</span>
          </div>
        ))}
      </div>
    </section>
  );
}
