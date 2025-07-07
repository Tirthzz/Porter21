"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductsImagesProps {
    images: { id: number; url: string }[];
}

const ProductsImages: React.FC<ProductsImagesProps> = ({ images }) => {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <div className="h-[500px] relative">
                <Image
                    src={images[index].url}
                    alt={`Product Image ${index + 1}`}
                    fill
                    sizes="50vw"
                    className="object-cover rounded-md"
                />
            </div>
            <div className="flex justify-between gap-4 mt-8">
                {images.map((img, i) => (
                    <div
                        className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
                        key={img.id}
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={img.url}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            sizes="30vw"
                            className="object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsImages;
