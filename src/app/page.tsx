import CategoryList from "@/Components/CategoryList";
import ProductList from "@/Components/ProductList";
import Slider from "@/Components/Slider";

const HomePage = () => {
    return (
        <div className="bg-background text-text">
            <Slider />

            {/* Featured Products Section */}
            <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <h1 className="text-2xl font-semibold text-primary mb-6">
                    Featured Products
                </h1>
                {/* Uncomment when ready to show featured products */}
                {/* <ProductList /> */}
            </section>

            {/* Categories Section */}
            {/* Categories Section */}
            <section className="mt-24 bg-footerbg py-12 rounded-md">
                <h1 className="text-2xl font-semibold text-primary mb-6 text-center">
                    Browse by Categories
                </h1>
                <CategoryList />
            </section>


            {/* New Products Section */}
            <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <h1 className="text-2xl font-semibold text-primary mb-6">
                    New Products
                </h1>
                <ProductList />
            </section>
        </div>
    );
};

export default HomePage;
