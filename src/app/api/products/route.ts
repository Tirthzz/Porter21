import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");
    const subcat = searchParams.get("subcat");
    const varietal = searchParams.get("varietal");
    const name = searchParams.get("name");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    try {
        let products;

        console.log("Incoming filters:", { cat, subcat, varietal, name, page, limit });

        if (name) {
            products = await prisma.$queryRawUnsafe(`
                SELECT * FROM product_profiles
                WHERE LOWER(provi_product_name) LIKE LOWER('%${name}%')
                LIMIT ${limit + 1} OFFSET ${skip}
            `);
            console.log("Products fetched via name search:", products.length);
        } else {
            products = await prisma.product_profiles.findMany({
                where: {
                    ...(cat && {
                        category: { slug: cat }
                    }),
                    ...(subcat && {
                        subcategory: { slug: subcat }
                    }),
                    ...(varietal && {
                        varietals: { equals: varietal, mode: "insensitive" } // adjust if array
                    })
                },
                include: {
                    category: true,
                    subcategory: true,
                    product_prices: {
                        orderBy: { month: "desc" },
                        take: 1,
                    },
                },
                skip,
                take: limit + 1,
            });
            console.log("Products fetched via filtered search:", products.length);
        }

        const hasMore = products.length > limit;
        const slicedProducts = hasMore ? products.slice(0, limit) : products;

        const convertBigIntsAndDecimals = (obj: any): any => {
            if (Array.isArray(obj)) {
                return obj.map(convertBigIntsAndDecimals);
            } else if (obj !== null && typeof obj === "object") {
                return Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => {
                        if (typeof value === "bigint") {
                            return [key, value.toString()];
                        } else if (value instanceof Prisma.Decimal) {
                            return [key, value.toNumber()];
                        } else {
                            return [key, convertBigIntsAndDecimals(value)];
                        }
                    })
                );
            }
            return obj;
        };

        const safeProducts = convertBigIntsAndDecimals(slicedProducts);

        console.log("Returning", safeProducts.length, "products, hasMore:", hasMore);

        return new NextResponse(
            JSON.stringify({
                products: safeProducts,
                hasMore,
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error("API ERROR:", err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};