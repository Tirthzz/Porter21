import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    const products = await prisma.product_profiles.findMany({
      where: cat
        ? {
            category: {
              slug: cat,
            },
          }
        : {},
      include: {
        category: true,
        subcategory: true,
      },
    });

    // Convert BigInt fields to string before sending
    const safeProducts = products.map((product) => ({
      ...product,
      id: product.id.toString(),
      categoryId: product.categoryId ?? null,
      subcategoryId: product.subcategoryId ?? null,
    }));

    return new NextResponse(JSON.stringify(safeProducts), {
      status: 200,
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
