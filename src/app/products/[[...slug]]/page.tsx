// src/app/(routes)/products/[...slug]/page.tsx

import Filter from "@/Components/Filter";
import ProductList from "@/Components/ProductList";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
    const title = params.slug ? params.slug.map(s => s.replace(/-/g, ' ')).join(" | ") : "Products";
    return {
        title: `${title} | Capital Spirits`,
        description: `Browse products for ${title} on Capital Spirits.`,
    };
}

const Breadcrumbs = ({ slug }: { slug: string[] }) => {
    const parts = slug || [];
    const links = parts.map((part, idx) => {
        const href = "/products/" + parts.slice(0, idx + 1).join("/");
        const label = part.replace(/-/g, " ");
        return (
            <Link key={idx} href={href} className="text-pink-600 hover:underline">
                {label}
            </Link>
        );
    });

    return (
        <div className="text-sm text-gray-500 space-x-1 mt-4">
            <Link href="/products" className="text-pink-600 hover:underline">Products</Link>
            {links.map((link, idx) => (
                <span key={idx}>
                    {" / "}{link}
                </span>
            ))}
        </div>
    );
};

const ListPage = ({ params }: { params: { slug: string[] } }) => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 relative">
            <Breadcrumbs slug={params.slug} />

            <div className="mt-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filter */}
                <div className="w-full lg:w-1/4 xl:w-1/5">
                    <Filter />
                </div>

                {/* Product List */}
                <div className="w-full lg:w-3/4 xl:w-4/5">
                    <h1 className="text-xl font-semibold mb-4">Products for you!</h1>
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default ListPage;
