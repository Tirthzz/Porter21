import Image from "next/image";
import Link from "next/link";
import { catType } from "@/types/types";

// Fetch categories from your API
const getData = async () => {
    const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories.");
    }

    return res.json();
};

const CategoryList = async () => {
    const cats: catType = await getData();

    return (
        <div className="flex justify-center items-center gap-6 sm:gap-8 lg:gap-12 flex-wrap">
            {cats.slice(0, 5).map((item) => (
                <Link
                    href={`/list?cat=${item.slug}`}
                    key={item.id}
                    className="flex flex-col items-center group transition-transform hover:scale-105 w-24 sm:w-28 lg:w-32"
                >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-border bg-background group-hover:border-primary transition">
                        <Image
                            src="https://res.cloudinary.com/tiz2/image/upload/e_trim/f_auto,w_1500,h_1000,c_pad,b_white/v1701889056/products/2029346.jpg"
                            alt={item.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="mt-3 text-sm sm:text-base text-center font-medium text-text group-hover:text-primary transition">
                        {item.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default CategoryList;
