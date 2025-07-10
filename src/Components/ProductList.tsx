"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const parts = pathname.split("/").filter(Boolean);
    const cat = parts[1] || "";
    const subcat = parts[2] || "";

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams(searchParams);
            if (cat) params.set("cat", cat);
            if (subcat) params.set("subcat", subcat);
            const res = await fetch(`/api/products?${params.toString()}`);
            const data = await res.json();
            setProducts(data.products);
            setHasMore(data.hasMore);
            setLoading(false);
        };
        fetchProducts();
    }, [searchParams, pathname]);

    if (loading) return <div>Loading products...</div>;
    if (products.length === 0) return <div className="text-center text-gray-500">No products found.</div>;

    return (
        <div>
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

            <Pagination hasMore={hasMore} />
        </div>
    );
};

export default ProductList;

