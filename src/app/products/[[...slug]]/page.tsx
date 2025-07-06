// src/app/(routes)/products/[...slug]/page.tsx

import Filter from "@/Components/Filter";
import ProductList from "@/Components/ProductList";
import Image from "next/image";
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
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
            {/* Breadcrumbs */}
            <Breadcrumbs slug={params.slug} />

            {/* CAMPAIGN */}
            {/*<div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64 mt-6">*/}
            {/*    <div className="w-2/3 flex flex-col items-center justify-center gap-8">*/}
            {/*        <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">*/}
            {/*            Grab up to 50% off on <br /> Selected Products*/}
            {/*        </h1>*/}
            {/*        <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">*/}
            {/*            Buy Now*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    <div className="relative w-1/3">*/}
            {/*        <Image src="/woman.png" alt="Campaign" fill className="object-contain" />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Filter */}
            {/*<Filter />*/}

            {/* Products */}
            <h1 className="mt-12 text-xl font-semibold">Products for you!</h1>
            <ProductList />
        </div>
    );
};

export default ListPage;