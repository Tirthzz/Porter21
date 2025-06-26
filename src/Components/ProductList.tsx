"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { productType } from "@/types";

const ProductList = () => {
  const [products, setProducts] = useState<productType>([]);
  const searchParams = useSearchParams();
  const catSlug = searchParams.get("cat");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products${catSlug ? `?cat=${catSlug}` : ""}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("API ERROR:", err);
      }
    };

    fetchProducts();
  }, [catSlug]);

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
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
              ${product.product_prices?.[0]?.min_bottle_price || 0}
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
  );
};

export default ProductList;
