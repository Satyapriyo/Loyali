"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { fetchUserCNFTs } from "@/lib/cnfts";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Rewards() {
    const { publicKey } = useWallet();
    const [cnfts, setCnfts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!publicKey) return;
        setLoading(true);
        fetchUserCNFTs(publicKey.toString())
            .then(setCnfts)
            .finally(() => setLoading(false));
    }, [publicKey]);
    console.log(cnfts);

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br">
            <div className="  my-8">
                <h1 className="text-7xl max-w-xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-indigo-500 text-transparent bg-clip-text py-5">
                    Your NFTs
                </h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
                </div>
            ) : cnfts.length === 0 ? (
                <p className="text-white text-center">No cNFTs found in your wallet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer  max-w-[80vw] mx-auto">
                    {cnfts.map((cnft) => (
                        <Card
                            key={cnft.id}
                            className="rounded-2xl hover:shadow-xl transition-all duration-300 border-none hover:scale-105 shadow-2xl"
                        >
                            <CardHeader className="p-1">
                                <Image
                                    src={cnft.content.links.image}
                                    alt={cnft.content.metadata.name}
                                    className="w-full h-48 object-cover rounded-2xl"
                                />
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                                    {cnft.content.metadata.name}
                                </CardTitle>
                                <p className="text-sm text-gray-500 truncate">
                                    {cnft.content.metadata.symbol || "Loyalty cNFT"}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
