"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const parts = pathname.split("/").filter(Boolean);
    const cat = parts[1] || "";
    const subcat = parts[2] || "";
    const varietal = parts[3] || "";

    const page = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams(searchParams);
            if (cat) params.set("cat", cat);
            if (subcat) params.set("subcat", subcat);
            if (varietal) params.set("varietal", varietal);
            params.set("page", page.toString());
            params.set("limit", ITEMS_PER_PAGE.toString());

            const res = await fetch(`/api/products?${params.toString()}`);
            const data = await res.json();
            setProducts(data.products);
            setHasMore(data.hasMore);
            setLoading(false);
        };
        fetchProducts();
    }, [searchParams, pathname, page]);

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) return <div>Loading products...</div>;

    const pageNumbers = [];
    const lastPage = hasMore ? page + 1 : page; // crude estimation, can improve with total count later
    for (let p = 1; p <= lastPage; p++) {
        pageNumbers.push(p);
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {products.map((product) => (
                    <Link
                        href={`/${product.slug}`}
                        key={product.id}
                        className="border p-2 rounded hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={product.image_url || "/placeholder.png"}
                                alt={product.provi_product_name}
                                fill
                                className="object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <h3 className="text-sm mt-2 line-clamp-2">{product.provi_product_name}</h3>
                        <p className="text-pink-600 font-semibold">
                            ${product.website_pricing?.unit_price_after?.toFixed(2) || "N/A"}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded border ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                    Previous
                </button>
                {pageNumbers.map((p) => (
                    <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`px-3 py-1 rounded border ${p === page ? "bg-pink-500 text-white" : "hover:bg-gray-100"}`}
                    >
                        {p}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={!hasMore}
                    className={`px-3 py-1 rounded border ${!hasMore ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default ProductList;
