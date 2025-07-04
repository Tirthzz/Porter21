import Add from "@/Components/Add";
import CustomizeProducts from "@/Components/CustomizeProducts";
import ProductsImages from "@/Components/ProductsImages";

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductsImages />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Prouct Name</h1>
        <p className="text-gray-500">
          wine description that needs to be inseted!!!!!!!
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
