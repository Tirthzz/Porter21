import { NextResponse } from "next/server";
import { PrismaClient, Category, Subcategory } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
            include: {
                subcategories: {
                    orderBy: { name: "asc" },
                },
            },
        });

        // Wine varietals
        const wineCategory = categories.find((cat: Category) => cat.name.toLowerCase() === "wine");
        if (wineCategory) {
            const wineSubcategories = wineCategory.subcategories.filter((subcat: Subcategory) =>
                [
                    "Red Wine",
                    "White Wine",
                    "Sparkling Wine",
                    "Rose Wine",
                    "Dessert/Fortified Wine",
                    "Sake"
                ].includes(subcat.name)
            );

            const wineVarietalsMap: Record<string, string[]> = {
                "Red Wine": ["Cabernet Sauvignon", "Pinot Noir", "Merlot", "Malbec", "Red Blend"],
                "White Wine": ["Chardonnay", "Sauvignon Blanc", "Riesling", "Pinot Grigio", "White Blend"],
                "Sparkling Wine": ["Champagne", "Prosecco", "Cava", "Sparkling Rose"],
                "Rose Wine": ["Provence Rose", "Rose Blend", "Pinot Noir Rose"],
                "Dessert/Fortified Wine": ["Port", "Sherry", "Madeira"],
                "Sake": ["Junmai", "Nigori", "Sparkling Sake"],
            };

            wineCategory.subcategories = wineSubcategories.map((subcat: Subcategory) => ({
                ...subcat,
                varietals: wineVarietalsMap[subcat.name] || [],
            }));
        }

        // Spirits varietals
        const spiritsCategory = categories.find((cat: Category) => cat.name.toLowerCase() === "spirits");
        if (spiritsCategory) {
            const spiritsSubcategories = spiritsCategory.subcategories.filter((subcat: Subcategory) =>
                [
                    "Whiskey",
                    "Tequila",
                    "Vodka",
                    "Rum",
                    "Gin",
                    "Brandy",
                    "Liqueur"
                ].includes(subcat.name)
            );

            const spiritsVarietalsMap: Record<string, string[]> = {
                "Whiskey": ["Bourbon Whiskey", "Scotch Whisky", "Irish Whiskey", "Rye Whiskey"],
                "Tequila": ["Blanco", "Reposado", "Anejo", "Mezcal"],
                // The others will display without varietals for simplicity
            };

            spiritsCategory.subcategories = spiritsSubcategories.map((subcat: Subcategory) => ({
                ...subcat,
                varietals: spiritsVarietalsMap[subcat.name] || [],
            }));
        }

        return NextResponse.json(categories);
    } catch (error) {
        console.error("API MENU ERROR:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
