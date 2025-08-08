import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="min-h-screen bg-[#f3eee7] flex flex-col items-center justify-center px-4 text-[#4b3f2f]">
      <div className="bg-white p-10 rounded-2xl shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">You have been logged out</h1>
        <p className="mb-6 text-lg">Thank you for visiting Handcrafted HAVEN. We hope to see you again soon!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-2 rounded-md">
            🏠 Back to Home
          </Link>
          <Link href="/login" className="bg-[#5d5342] hover:bg-[#483e30] text-white font-medium px-6 py-2 rounded-md">
            🔐 Log In Again
          </Link>
        </div>
      </div>
    </div>
  );
}
