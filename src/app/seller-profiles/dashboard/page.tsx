import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import SellerDashboardClient from "@/app/seller-profiles/dashboard/SellerDashboardClient";
import { Suspense } from "react";

export default async function SellerDashboardPage() {
  // 🔐 Fetch the current authenticated session
  const session = await getServerSession(authOptions);

  // 🔒 Redirect to login page if not logged in or not a seller
  if (!session || session.user.role !== "seller") {
    redirect("/login");
  }

  // ✅ Get seller ID from session
  const sellerId = session.user.id;

  // ✅ Get seller name with fallback
  const sellerName = session.user.name ?? "Seller";

  // 📦 Fetch all products for this seller from the database
  const products = await prisma.product.findMany({
    where: { sellerId },
  });

  // 🧪 Mock data (replace with real data later)
  //const totalSales = 2590.75; // 💡 Example total sales (mocked)
  //const ordersCount = 47;     // 💡 Example order count (mocked)

  return (
    <Suspense fallback={<div className="text-center p-10 text-[#4b3f2f]">Loading seller dashboard...</div>}>
      <SellerDashboardClient
        products={products}
        sellerName={sellerName} totalSales={0} ordersCount={0}        //totalSales={totalSales}
      //ordersCount={ordersCount}
      />

      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Your Seller Dashboard!</h2>
          <p className="text-gray-600 mb-4">
            Start selling your handcrafted products on Handcrafted HAVEN. Here's what you can do:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Add new products to your store</li>
            <li>Manage your product listings</li>
            <li>Track your sales and orders</li>
            <li>Update your seller profile</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          {/* 🔓 Logout form that redirects to /logout after sign out */}
          <form action="/api/auth/signout?callbackUrl=/logout" method="post">
            <button
              type="submit"
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
