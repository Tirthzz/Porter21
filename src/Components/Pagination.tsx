"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
    hasMore: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ hasMore }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-pink-100 text-gray-700"}`}
            >
                Previous
            </button>

            {[...Array(5)].map((_, idx) => {
                const page = currentPage - 2 + idx;
                if (page < 1) return null;
                return (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded ${page === currentPage ? "bg-pink-500 text-white" : "bg-gray-100 hover:bg-pink-100 text-gray-700"}`}
                    >
                        {page}
                    </button>
                );
            })}

            {hasMore && (
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-pink-100 text-gray-700"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
