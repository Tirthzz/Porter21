import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");
    const subcat = searchParams.get("subcat");
    const varietalRaw = searchParams.get("varietal");
    const regionRaw = searchParams.get("region");
    const countryRaw = searchParams.get("country");
    const name = searchParams.get("name");
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    try {
        const varietal = varietalRaw ? decodeURIComponent(varietalRaw) : null;
        const region = regionRaw ? decodeURIComponent(regionRaw) : null;
        const country = countryRaw ? decodeURIComponent(countryRaw) : null;

        console.log("Incoming filters:", {
            cat, subcat, varietal, region, country, name, minPrice, maxPrice, page, limit
        });

        let products;

        if (name) {
            products = await prisma.$queryRawUnsafe<any[]>(`
                SELECT * FROM product_profiles
                WHERE LOWER(provi_product_name) LIKE LOWER('%${name}%')
                LIMIT ${limit + 1} OFFSET ${skip}
            `);
        } else {
            products = await prisma.product_profiles.findMany({
                where: {
                    ...(cat && { category: { slug: cat } }),
                    ...(subcat && { subcategory: { slug: subcat } }),
                    ...(varietal && { varietal: { in: varietal.split(",").map(v => v.trim()) } }),
                    ...(region && { region: { in: region.split(",").map(r => r.trim()) } }),
                    ...(country && { county: { in: country.split(",").map(c => c.trim()) } }),
                    ...(minPrice && { website_pricing: { unit_price_after: { gte: parseFloat(minPrice) } } }),
                    ...(maxPrice && { website_pricing: { unit_price_after: { lte: parseFloat(maxPrice) } } }),
                },
                include: {
                    category: true,
                    subcategory: true,
                    website_pricing: true,
                },
                skip,
                take: limit + 1,
            });
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

        return NextResponse.json(
            { products: safeProducts, hasMore },
            { status: 200 }
        );
    } catch (err) {
        console.error("API PRODUCTS ERROR:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};

