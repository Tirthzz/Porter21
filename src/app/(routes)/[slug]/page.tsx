"use client";

import { notFound } from "next/navigation";
import Add from "@/Components/Add";
import CustomizeProducts from "@/Components/CustomizeProducts";
import ProductsImages from "@/Components/ProductsImages";
import { SingleProductType } from "../../../types/types";
import { useState, useEffect } from "react";

const getData = async (slug: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        throw new Error("Failed to fetch product.");
    }

    return res.json();
};

const SinglePage = ({ params }: { params: { slug: string } }) => {
    const [singleProduct, setSingleProduct] = useState<SingleProductType | null>(null);
    const [selectedPack, setSelectedPack] = useState<number>(9);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(params.slug);
            setSingleProduct(data);
        };
        fetchData();
    }, [params.slug]);

    if (!singleProduct) {
        return <div>Loading...</div>;
    }

    const pricing = singleProduct.website_pricing;
    const quantityAvailable = singleProduct.product_quantity?.quantity ?? 0;

    // NEW: Compute selected pack price
    const selectedPackPrice =
        selectedPack === 3
            ? pricing?.price_3pk ?? 0
            : selectedPack === 6
                ? pricing?.price_6pk ?? 0
                : selectedPack === 9
                    ? pricing?.price_9pk ?? 0
                    : pricing?.price_12pk ?? 0;

    // NEW: Compute packs available
    const packsAvailable = Math.floor(quantityAvailable / selectedPack);

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Product Images */}
                <div className="w-full max-w-lg mx-auto lg:mx-0">
                    <ProductsImages
                        images={[
                            {
                                id: 1,
                                url: singleProduct.image_url ?? "/placeholder.png",
                            },
                        ]}
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-medium">
                        {singleProduct.provi_product_name ?? "Product Name"}
                    </h1>

                    <p className="text-gray-500">
                        {singleProduct.product_information ?? "No description available for this product."}
                    </p>

                    <div className="border-t pt-4" />

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        {pricing ? (
                            <>
                                <span className="text-lg text-gray-400 line-through">
                                    ${parseFloat(pricing.unit_price_before).toFixed(2)}
                                </span>
                                <span className="text-2xl font-bold text-green-700">
                                    ${parseFloat(pricing.unit_price_after).toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl text-gray-500">Price unavailable</span>
                        )}
                    </div>

                    <div className="h-[2px] bg-gray-100" />

                    {pricing && (
                        <CustomizeProducts
                            pricing={{
                                price_3pk: pricing.price_3pk ? parseFloat(pricing.price_3pk) : null,
                                price_6pk: pricing.price_6pk ? parseFloat(pricing.price_6pk) : null,
                                price_9pk: pricing.price_9pk ? parseFloat(pricing.price_9pk) : null,
                                price_12pk: pricing.price_12pk ? parseFloat(pricing.price_12pk) : null,
                            }}
                            selectedPack={selectedPack}
                            setSelectedPack={setSelectedPack}
                        />
                    )}

                    <div className="h-[2px] bg-gray-100" />

                    {/* Add to Cart */}
                    <Add
                        productId={singleProduct.id}
                        productTitle={singleProduct.provi_product_name ?? "Product Name"}
                        productImage={singleProduct.image_url}
                        selectedPack={selectedPack}
                        selectedPackLabel={`${selectedPack} Pack`}
                        selectedPackPrice={selectedPackPrice}
                        stockAvailable={packsAvailable}
                    />

                    <div className="h-[2px] bg-gray-100" />

                    <div>
                        <h4 className="font-medium mb-4">Product Info</h4>
                        <p>{singleProduct.product_information ?? "No additional product information available."}</p>
                    </div>

                    <div className="h-[2px] bg-gray-100" />

                    <div>
                        <h4 className="font-medium mb-4">Return & Refund Policy</h4>
                        <p>We offer a 30-day return and refund policy for unopened bottles in their original condition.</p>
                    </div>

                    <div className="h-[2px] bg-gray-100" />

                    <div>
                        <h4 className="font-medium mb-4">Shipping Info</h4>
                        <p>Shipping typically takes 3-5 business days, depending on your location and the product availability.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;