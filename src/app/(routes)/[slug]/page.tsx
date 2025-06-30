import { notFound } from "next/navigation";
import Add from "@/Components/Add";
import CustomizeProducts from "@/Components/CustomizeProducts";
import ProductsImages from "@/Components/ProductsImages";
import { SingleProductType } from "../../../types/types";


const getData = async () => {
    const res = await fetch("http://localhost:3000/api/products/${id}", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories.");
    }

    return res.json();
};


// Slug page for product display
const SinglePage = async ({ params }: { params: { slug: string } }) => {
    const singleProduct: SingleProductType = await getData(params.id);  

    const reservedRoutes = ["login", "about", "contact", "shop", "deals", "home"];

    if (reservedRoutes.includes(params.slug.toLowerCase())) {
        notFound(); // Prevents reserved routes from being handled here
    }

    console.log("slug page rendered:", params.slug);

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            {/* Product Images */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductsImages />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">Product Name</h1>
                <p className="text-gray-500">
                    Wine description that needs to be inserted!!!!!!!
                </p>

                <div className="h-[2px] bg-gray-100" />

                <div className="flex items-center gap-4">
                    <h3 className="text-xl text-gray-500 line-through">$59</h3>
                    <h2 className="font-medium text-2xl">$49</h2>
                </div>

                <div className="h-[2px] bg-gray-100" />

                <CustomizeProducts />
                <Add />

                <div className="h-[2px] bg-gray-100" />

                <div>
                    <h4 className="font-medium mb-4">Product Info</h4>
                    <p>Description</p>
                </div>

                <div className="h-[2px] bg-gray-100" />

                <div>
                    <h4 className="font-medium mb-4">Return & Refund Policy</h4>
                    <p>Description</p>
                </div>

                <div className="h-[2px] bg-gray-100" />

                <div>
                    <h4 className="font-medium mb-4">Shipping Info</h4>
                    <p>Description</p>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;
