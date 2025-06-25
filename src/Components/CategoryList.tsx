import Image from "next/image";
import Link from "next/link";
import { catType } from "@/types/types";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const CategoryList = async () => {
  const cats: catType = await getData();

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {cats.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item.id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src="https://res.cloudinary.com/tiz2/image/upload/e_trim/f_auto,w_1500,h_1000,c_pad,b_white/v1701889056/products/2029346.jpg"
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
