export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-8 mt-auto flex flex-wrap justify-between text-sm">
      <div className="flex gap-6">
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/terms" className="hover:underline">Terms</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </div>
      <div className="flex gap-4">
        <a href="#" aria-label="Facebook" className="hover:text-yellow-400">Facebook</a>
        <a href="#" aria-label="Instagram" className="hover:text-yellow-400">Instagram</a>
        <a href="#" aria-label="Pinterest" className="hover:text-yellow-400">Pinterest</a>
      </div>
    </footer>
  );
}
