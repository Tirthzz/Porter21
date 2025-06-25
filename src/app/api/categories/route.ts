import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log("Fetching categories...");
    const categories = await prisma.category.findMany();
    console.log("Fetched:", categories);
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error("API ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
