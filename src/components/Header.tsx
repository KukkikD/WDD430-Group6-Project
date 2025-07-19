export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-900">Handcrafted Haven</h1>
      <nav className="space-x-4">
        <a href="#" className="text-gray-700 hover:text-green-800">Home</a>
        <a href="#" className="text-gray-700 hover:text-green-800">Shop</a>
        <a href="#" className="text-gray-700 hover:text-green-800">About</a>
        <a href="#" className="text-gray-700 hover:text-green-800">Seller Profile</a>
        <button className="bg-green-800 text-white px-4 py-2 rounded">Cart (3)</button>
      </nav>
    </header>
  );
}
