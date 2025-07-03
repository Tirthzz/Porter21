import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");
    const name = searchParams.get("name");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    try {
        let products;

        if (name) {
            // Raw SQL for case-insensitive search with MySQL
            products = await prisma.$queryRawUnsafe(`
                SELECT * FROM product_profiles
                WHERE LOWER(provi_product_name) LIKE LOWER('%${name}%')
                LIMIT ${limit + 1} OFFSET ${skip}
            `);
        } else {
            products = await prisma.product_profiles.findMany({
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
                    product_prices: {
                        orderBy: {
                            month: "desc",
                        },
                        take: 1,
                    },
                },
                skip,
                take: limit + 1,
            });
        }

        const hasMore = products.length > limit;
        const slicedProducts = hasMore ? products.slice(0, limit) : products;

        // Convert BigInt and Decimal recursively
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
