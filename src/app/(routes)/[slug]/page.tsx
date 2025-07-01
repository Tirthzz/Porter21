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
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">

            {/* Product Images */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
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
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">
                    {singleProduct.provi_product_name ?? "Product Name"}
                </h1>

                <p className="text-gray-500">
                    {singleProduct.product_information ?? "No description available for this product."}
                </p>

                <div className="h-[2px] bg-gray-100" />

                <div className="flex items-center gap-4">
                    {singleProduct.product_prices && singleProduct.product_prices.length > 0 ? (
                        <>
                            {singleProduct.product_prices[0].min_bottle_price && (
                                <h3 className="text-xl text-gray-500 line-through">
                                    ${parseFloat(singleProduct.product_prices[0].min_bottle_price).toFixed(2)}
                                </h3>
                            )}
                            {singleProduct.product_prices[0].case_price && (
                                <h2 className="font-medium text-2xl">
                                    ${parseFloat(singleProduct.product_prices[0].case_price).toFixed(2)}
                                </h2>
                            )}
                        </>
                    ) : (
                        <h2 className="font-medium text-2xl">Price unavailable</h2>
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
    );
};

export default SinglePage;
