export type catType = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
}[];

export type SingleProductType = {
    id: string;
    slug: string;
    provi_product_name?: string;
    image_url?: string;
    product_information?: string;
    category?: { name: string; slug: string };
    subcategory?: { name: string; slug: string };
    product_prices?: {
        id: string;
        vendor_id: string;
        vendor_sku?: string;
        min_bottle_price?: string;
        case_price?: string;
        month?: string;
    }[];
};

export type ProductListType = SingleProductType[];

export type CartItemType = {
    id: string;
    title: string;
    img?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
};

export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
};


export type ActionTypes = {
    addToCart: (item: SingleProductType) => void;
    removeFromCart: (item: SingleProductType) => void;
}
