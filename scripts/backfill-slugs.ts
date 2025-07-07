import { prisma } from "../src/utils/connect";

async function backfillSlugs() {
    const products = await prisma.product_profiles.findMany({
        where: { slug: null },
    });

    for (const product of products) {
        const namePart = (product.vendor_product_name ?? "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        const idPart = product.id.toString();

        const slug = `${namePart}-${idPart}`;

        try {
            await prisma.product_profiles.update({
                where: { id: product.id },
                data: { slug },
            });
            console.log(`Slug set: ${slug}`);
        } catch (error) {
            console.error(`Failed for product id ${product.id}:`, error);
        }
    }

    console.log("Slug backfill completed.");
    process.exit(0);
}

backfillSlugs().catch((error) => {
    console.error(error);
    process.exit(1);
});
