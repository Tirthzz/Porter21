"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductListType, SingleProductType } from "@/types/types";

const ITEMS_PER_PAGE = 20;

const ProductList = () => {
    const [products, setProducts] = useState<ProductListType>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const catSlug = searchParams.get("cat");
    const pageParam = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        setCurrentPage(pageParam);
    }, [pageParam]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const queryParams = new URLSearchParams();
                queryParams.set("page", currentPage.toString());
                queryParams.set("limit", ITEMS_PER_PAGE.toString());
                if (catSlug) queryParams.set("cat", catSlug);

                const res = await fetch(`/api/products?${queryParams}`);
                if (!res.ok) throw new Error("Failed to fetch products");

                const data = await res.json();
                console.log("API Response Data:", data);
                setProducts(data.products);
                setHasMore(data.hasMore);
            } catch (err) {
                console.error("API ERROR:", err);
            }
        };

        fetchProducts();
    }, [catSlug, currentPage]);

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="mt-12">
            <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
                {products.map((product: SingleProductType) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                    >
                        <div className="relative w-full h-80">
                            <Image
                                src={product.image_url || "/placeholder.png"}
                                alt={product.provi_product_name || "Product Image"}
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
                            />
                            <Image
                                src={product.image_url || "/placeholder.png"}
                                alt={product.provi_product_name || "Product Image"}
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
                            />
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">{product.provi_product_name}</span>
                            <span className="font-semibold">
                                ${Number(product.product_prices?.[0]?.min_bottle_price ?? 0).toFixed(2)}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">
                            {product.product_information?.slice(0, 50) ||
                                "No description available..."}
                        </div>
                        <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
                            Add to Cart
                        </button>
                    </Link>
                ))}
            </div>

            <div className="mt-10 flex justify-center gap-4">
                {currentPage > 1 && (
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Previous
                    </button>
                )}
                {hasMore && (
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductList;
