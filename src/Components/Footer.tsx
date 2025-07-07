import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-footerbg text-sm text-text mt-24">
            {/* TOP */}
            <div className="flex flex-col md:flex-row justify-between gap-24">
                {/* LEFT: Branding and contact */}
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
                    <Link href="/">
                        <span className="text-2xl tracking-wide text-primary font-semibold">
                            Capital Spirits
                        </span>
                    </Link>
                    <p>63 Pratt St, Hartford, CT 06103 Downtown</p>
                    <span className="font-semibold">info@capspirits.com</span>
                    <span className="font-semibold">+1 (860) 321-2254</span>
                    <div className="flex gap-4 mt-2">
                        <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
                        <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
                        <Image src="/youtube.png" alt="YouTube" width={20} height={20} />
                        <Image src="/pinterest.png" alt="Pinterest" width={20} height={20} />
                        <Image src="/x.png" alt="Twitter/X" width={20} height={20} />
                    </div>
                </div>

                {/* CENTER: Quick links */}
                <div className="hidden lg:flex justify-between w-1/2">
                    {/* COMPANY */}
                    <div className="flex flex-col gap-4">
                        <h2 className="font-semibold text-lg text-primary">COMPANY</h2>
                        <Link href="/" className="hover:text-icon transition">About Us</Link>
                        <Link href="/" className="hover:text-icon transition">Careers</Link>
                        <Link href="/" className="hover:text-icon transition">Affiliates</Link>
                        <Link href="/" className="hover:text-icon transition">Blog</Link>
                        <Link href="/" className="hover:text-icon transition">Contact Us</Link>
                    </div>
                    {/* SHOP */}
                    <div className="flex flex-col gap-4">
                        <h2 className="font-semibold text-lg text-primary">SHOP</h2>
                        <Link href="/" className="hover:text-icon transition">New Arrivals</Link>
                        <Link href="/" className="hover:text-icon transition">Accessories</Link>
                        <Link href="/" className="hover:text-icon transition">Men</Link>
                        <Link href="/" className="hover:text-icon transition">Women</Link>
                        <Link href="/" className="hover:text-icon transition">All Products</Link>
                    </div>
                    {/* HELP */}
                    <div className="flex flex-col gap-4">
                        <h2 className="font-semibold text-lg text-primary">HELP</h2>
                        <Link href="/" className="hover:text-icon transition">Customer Service</Link>
                        <Link href="/" className="hover:text-icon transition">My Account</Link>
                        <Link href="/" className="hover:text-icon transition">Find a Store</Link>
                        <Link href="/" className="hover:text-icon transition">Legal & Privacy</Link>
                        <Link href="/" className="hover:text-icon transition">Gift Card</Link>
                    </div>
                </div>

                {/* RIGHT: Subscribe */}
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
                    <h2 className="font-semibold text-lg text-primary">SUBSCRIBE</h2>
                    <p>Be the first to get the latest news about trends, promotions, and much more!</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="p-3 w-3/4 border border-border bg-background outline-none"
                        />
                        <button className="w-1/4 bg-primary text-white font-medium hover:bg-icon transition">
                            JOIN
                        </button>
                    </div>
                    <span className="font-semibold">Secure Payments</span>
                    <div className="flex gap-2">
                        <Image src="/discover.png" alt="Discover" width={40} height={24} />
                        <Image src="/skrill.png" alt="Skrill" width={40} height={24} />
                        <Image src="/paypal.png" alt="PayPal" width={40} height={24} />
                        <Image src="/mastercard.png" alt="MasterCard" width={40} height={24} />
                        <Image src="/visa.png" alt="Visa" width={40} height={24} />
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-16 text-xs text-text">
                <span>© 2025 Capital Spirits</span>
                <div className="flex flex-col md:flex-row gap-4">
                    <div>
                        <span className="text-gray-500 mr-2">Language:</span>
                        <span className="font-medium">United States | English</span>
                    </div>
                    <div>
                        <span className="text-gray-500 mr-2">Currency:</span>
                        <span className="font-medium">$ USD</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
