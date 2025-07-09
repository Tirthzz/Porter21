import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");
    const subcat = searchParams.get("subcat");
    const varietal = searchParams.get("varietal");

    try {
        const filters = await prisma.product_profiles.findMany({
            where: {
                ...(cat ? { category: { slug: cat } } : {}),
                ...(subcat ? { subcategory: { slug: subcat } } : {}),
                ...(varietal ? { varietal: { equals: varietal } } : {}),
                website_pricing: { unit_price_after: { not: null } },
            },
            select: {
                varietal: true,
                region: true,
                county: true,
                website_pricing: { select: { unit_price_after: true } },
            },
        });

        const varietalsSet = new Set<string>();
        const regionsSet = new Set<string>();
        const countriesSet = new Set<string>();
        const prices: number[] = [];

        filters.forEach(item => {
            if (item.varietal) varietalsSet.add(item.varietal);
            if (item.region) regionsSet.add(item.region);
            if (item.county) countriesSet.add(item.county);
            const price = item.website_pricing?.unit_price_after
                ? Number(item.website_pricing.unit_price_after)
                : null;
            if (price !== null) prices.push(price);
        });

        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

        return NextResponse.json({
            varietals: Array.from(varietalsSet).sort(),
            regions: Array.from(regionsSet).sort(),
            countries: Array.from(countriesSet).sort(),
            minPrice,
            maxPrice,
        });
    } catch (err) {
        console.error("API FILTERS ERROR:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};
