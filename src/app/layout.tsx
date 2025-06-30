import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AuthProvider from "@/Components/AuthProvider";

// Use Montserrat with all weights for flexibility with Tailwind utilities
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Capital Spirits",
    description: "Your Capital for all Beer, Wine & Spirits!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={montserrat.variable}>
            <AuthProvider>
            <body>
                <Navbar />
                {children}
                <Footer />
                </body>
            </AuthProvider>
        </html>
    );
}
