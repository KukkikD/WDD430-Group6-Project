//change to Server Components

import prisma from "@/app/lib/prisma";
import SellerDashboardClient from "./SellerDashboardClient";
import { Suspense } from "react"; // ✅ Import Suspense for client-side rendering

// TODO: Auth Integration Instructions
// Currently, we are using a mock session object for demonstration.
// 🔐 Once Auth is implemented, replace the mock session below with the actual session from next-auth like this:
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
// const session = await getServerSession(authOptions);
// if (!session) redirect("/login");
// const sellerId = session.user.id;
// const sellerName = session.user.name;

export default async function SellerDashboard() {
  // Mock session data (replace with actual session later)
  const session = {
    user: {
      id: "cmda12lsr0000j8lwnoit0acv", // ⚠️ Replace this with session.user.id
      name: "Crafty Seller",  // ⚠️ Replace this with session.user.name
      role: "seller",
    },
  };

  // Fetch products belonging to the current seller
  const products = await prisma.product.findMany({
    where: { sellerId: session.user.id },
  });

  return (
    <Suspense fallback={<div>Loading dashboard...</div>}> {/* ✅ Wrap in Suspense to satisfy useSearchParams hook inside client components */}
      <SellerDashboardClient
        products={products}
        sellerName={session.user.name}
      />
    </Suspense>
  );
}
