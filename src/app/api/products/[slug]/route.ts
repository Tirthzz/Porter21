import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const GET = async (
    req: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug } = params;

    try {
        const decodedSlug = decodeURIComponent(slug);

        const product = await prisma.product_profiles.findUnique({
            where: { slug: decodedSlug },
            include: {
                category: true,
                subcategory: true,
                product_prices: {
                    orderBy: { month: "desc" },
                    take: 1,
                },
                website_pricing: true,
                product_quantity: true
            },
        });

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }

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

        const safeProduct = convertBigIntsAndDecimals(product);

        return new NextResponse(JSON.stringify(safeProduct), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
};
