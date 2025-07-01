import { notFound } from "next/navigation";
import Add from "@/Components/Add";
import CustomizeProducts from "@/Components/CustomizeProducts";
import ProductsImages from "@/Components/ProductsImages";
import { SingleProductType } from "../../../types/types";

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

// Slug page for product display
const SinglePage = async ({ params }: { params: { slug: string } }) => {
    const singleProduct: SingleProductType = await getData(params.slug);

    console.log("slug page rendered:", params.slug);

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


                    <div className="flex items-center gap-4">
                        {singleProduct.product_prices && singleProduct.product_prices.length > 0 ? (
                            <>
                                {singleProduct.product_prices[0].min_bottle_price && (
                                    <span className="text-2xl font-bold text-green-700">
                                        ${parseFloat(singleProduct.product_prices[0].min_bottle_price).toFixed(2)}
                                    </span>
                                )}
                                {singleProduct.product_prices[0].case_price && (
                                    <span className="text-gray-400 line-through text-lg">
                                        ${parseFloat(singleProduct.product_prices[0].case_price).toFixed(2)}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-xl text-gray-500">Price unavailable</span>
                        )}
                    </div>


                <div className="h-[2px] bg-gray-100" />

                <CustomizeProducts />
                <Add />

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
