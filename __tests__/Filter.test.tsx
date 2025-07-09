import { render, screen, waitFor } from "@testing-library/react";
import Filter from "../src/components/Filter";
import { vi } from "vitest";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => "/products",
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                varietals: ["Chardonnay", "Cabernet Sauvignon"],
                regions: ["Napa Valley", "Sonoma"],
                countries: ["United States", "France"],
                minPrice: 10,
                maxPrice: 100,
            }),
    })
) as any;

test("Filter renders with fetched filters", async () => {
    render(<Filter />);
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Search Varietals")).toBeInTheDocument();
    });
});
