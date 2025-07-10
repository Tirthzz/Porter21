import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");
    const subcat = searchParams.get("subcat");
    const varietal = searchParams.get("varietal");

    try {
        const whereClause: any = {
            ...(cat ? { category: { slug: cat } } : {}),
            ...(subcat ? { subcategory: { slug: subcat } } : {}),
            ...(varietal ? { varietal: varietal } : {}),
            website_pricing: {
                is: {
                    unit_price_after: {
                        not: null,
                    },
                },
            },
        };

        const varietals = await prisma.product_profiles.groupBy({
            by: ["varietal"],
            where: whereClause,
            _count: { varietal: true },
        });

        const regions = await prisma.product_profiles.groupBy({
            by: ["region"],
            where: whereClause,
            _count: { region: true },
        });

        const countries = await prisma.product_profiles.groupBy({
            by: ["county"],
            where: whereClause,
            _count: { county: true },
        });

        const prices = await prisma.product_profiles.findMany({
            where: whereClause,
            select: {
                website_pricing: {
                    select: {
                        unit_price_after: true,
                    },
                },
            },
        });

        const priceValues = prices
            .map(item => Number(item.website_pricing?.unit_price_after))
            .filter(p => !isNaN(p));

        const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
        const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : 0;

        return NextResponse.json({
            varietals: varietals
                .filter(v => v.varietal !== null)
                .map(v => ({ name: v.varietal as string, count: v._count.varietal })),
            regions: regions
                .filter(r => r.region !== null)
                .map(r => ({ name: r.region as string, count: r._count.region })),
            countries: countries
                .filter(c => c.county !== null)
                .map(c => ({ name: c.county as string, count: c._count.county })),
            minPrice,
            maxPrice,
        });
    } catch (err) {
        console.error("API FILTERS ERROR:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};
