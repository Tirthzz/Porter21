//import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  //const wixClient = await wixClientServer();

  //const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {/* {cats.items.map((item) => ( */}
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
        <Link
          href={`/list?cat=/test`}
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          // key={item._id}
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.shopify.com/s/files/1/0871/2640/9530/files/jcell_cabernet_f_375ml_v20-1707408341712.png?v=1715264982"
              alt="Cabernet Sauvignon"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Cabernet Sauvignon
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
