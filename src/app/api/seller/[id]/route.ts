import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function GET(request: Request, { params } : {params: { id: string}}){
    const id = parseInt(params.id, 10);

    if(isNaN(id)){
        return NextResponse.json({ error: "Invalid seller ID" }, { status: 400});
    }

    try{

        //Use prisma to find the seller by ID
        const seller = await prisma.user.findUnique({
            where: {
                id: id.toString(),
                role: "SELLER",
            },
            include: {
                products:true,
            }
        });


        if(!seller) {
            return NextResponse.json({ error: "Seller not found" }, { status: 404 });
        }

        const { password, ...sellerData } = seller;

        return NextResponse.json(sellerData);

    } catch (error) {
        console.error("Error fetching seller:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}