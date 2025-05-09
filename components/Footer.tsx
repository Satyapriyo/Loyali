// components/Footer.tsx
import { Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from- mt-10 to-violet-900 text-gray-300 py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Logo / About */}
                <div>
                    <h2 className="text-xl font-bold text-white">YourNFTPlatform</h2>
                    <p className="mt-2 text-sm text-gray-400">Empowering creators and collectors with Solana NFTs & cNFTs.</p>
                </div>

                {/* Navigation */}
                <div className="space-y-2">
                    <h3 className="text-white font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/" className="hover:text-violet-400 transition">Home</Link></li>
                        <li><Link href="/mint" className="hover:text-violet-400 transition">Mint NFT</Link></li>
                        <li><Link href="/faq" className="hover:text-violet-400 transition">FAQ</Link></li>
                        <li><Link href="/about" className="hover:text-violet-400 transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Connect with Us</h3>
                    <div className="flex space-x-4">
                        <Link href="https://twitter.com" target="_blank" className="hover:text-violet-400">
                            <Twitter />
                        </Link>
                        <Link href="https://github.com" target="_blank" className="hover:text-violet-400">
                            <Github />
                        </Link>
                        <Link href="mailto:support@example.com" className="hover:text-violet-400">
                            <Mail />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} YourNFTPlatform. All rights reserved.
            </div>
        </footer>
    )
}
