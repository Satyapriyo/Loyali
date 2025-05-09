"use client";
import WalletButton from "@/components/WalletButton";
import Image from "next/image";

const punks = [
  { id: 1, name: "Punk #1", price: "2.5 SOL", image: "/punks/punk1.svg" },
  { id: 2, name: "Punk #2", price: "3.2 SOL", image: "/punks/punk2.svg" },
  { id: 3, name: "Punk #3", price: "1.8 SOL", image: "/punks/punk3.svg" },
];

const transactions = [
  { id: 1, name: "Punk #156", price: "5.2 SOL", image: "/punks/punk4.svg" },
  { id: 2, name: "Punk #342", price: "4.1 SOL", image: "/punks/punk5.svg" },
  { id: 3, name: "Punk #721", price: "3.7 SOL", image: "/punks/punk6.svg" },
];
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--foreground)] to-violet-900 dark:from-[var(--foreground)] dark:to-violet-90 z-0"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-indigo-500 text-transparent bg-clip-text">
            The project that inspired the modern CryptoArt movement
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            10,000 unique collectible characters with proof of ownership stored on the Solana blockchain.
          </p>
          <div className=" flex justify-around">
            <WalletButton />
          </div>
        </div>
      </section>

      {/* Meet the Punks Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Meet the Punks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {punks.map((punk) => (
              <div
                key={punk.id}
                className="bg-gradient-to-b from-black to-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="aspect-square relative">
                  <Image
                    src={punk.image}
                    alt={punk.name}
                    layout="fill"
                    objectFit="cover"
                    className="p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{punk.name}</h3>
                  <p className="text-violet-400 font-medium">{punk.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Largest Sales Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-violet-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Largest Sales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-gradient-to-b from-black to-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="aspect-square relative">
                  <Image
                    src={tx.image}
                    alt={tx.name}
                    layout="fill"
                    objectFit="cover"
                    className="p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{tx.name}</h3>
                  <p className="text-violet-400">{tx.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How do I get a punk? */}
      {/* <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How do I get a punk?</h2>
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">1. Get a Wallet</h3>
              <p className="text-gray-300">Download Phantom wallet from the Chrome store and set it up.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">2. Get Some SOL</h3>
              <p className="text-gray-300">Buy SOL from FTX or other exchanges and send it to your wallet.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">3. Mint Your Punk</h3>
              <p className="text-gray-300">Connect your wallet and mint your unique CryptoPunk NFT.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <FaqSection />
      {/* <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Details and FAQ</h2>
          <div className="space-y-8">
            <div className="border-b border-gray-800 pb-8">
              <h3 className="text-2xl font-semibold mb-4">What makes these punks special?</h3>
              <p className="text-gray-300">Each CryptoPunk is unique and can be officially owned by a single person on the Solana blockchain.</p>
            </div>
            <div className="border-b border-gray-800 pb-8">
              <h3 className="text-2xl font-semibold mb-4">How many punks are there?</h3>
              <p className="text-gray-300">There are 10,000 unique CryptoPunks in existence, each with their own unique characteristics.</p>
            </div>
            <div className="pb-8">
              <h3 className="text-2xl font-semibold mb-4">What can I do with my punk?</h3>
              <p className="text-gray-300">You can use your punk as a profile picture, sell it on the marketplace, or hold it as an investment.</p>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </main>
  );
}