"use client";
import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDropzone } from "react-dropzone";
import { createCnft } from "@/lib/umi";
import { toast } from "sonner"
import { createDrop } from "@/lib/db";
import Image from "next/image";


export default function Dashboard() {
    const { wallet, connected, publicKey } = useWallet();
    const [nftName, setNftName] = useState("");
    const [nftSymbol, setNftSymbol] = useState("");
    const [nftDescription, setNftDescription] = useState("");
    const [claimLink, setClaimLink] = useState<string | null>(null);

    const [collectionImageFile, setCollectionImageFile] = useState<File | null>(null);
    const [cnftImageFile, setCnftImageFile] = useState<File | null>(null);
    const [collectionPreview, setCollectionPreview] = useState<string | undefined>();
    const [cnftPreview, setCnftPreview] = useState<string | undefined>();

    const [isUploading, setIsUploading] = useState(false);


    const uploadMetadataToPinata = async (metadata: Record<string, any>) => {
        const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`, // or use a secure backend route
            },
            body: JSON.stringify(metadata),
        });

        if (!response.ok) throw new Error("Failed to upload metadata to Pinata");

        const data = await response.json();
        return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    };
    const handleUploadToPinata = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload image to Pinata");

        const data = await response.json();
        return data.url; // URL to access the image from IPFS
    };

    const onDropCollection = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const url = await handleUploadToPinata(file);
        setCollectionImageFile(file);
        setCollectionPreview(url);
    }, []);

    const onDropCnft = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const url = await handleUploadToPinata(file);
        setCnftImageFile(file);
        setCnftPreview(url);
    }, []);

    const mintCNFT = async () => {
        try {
            if (!wallet || !publicKey || !connected || !publicKey) {
                throw new Error("Wallet not connected.");
            }

            if (!collectionPreview || !cnftPreview) {
                throw new Error("Please upload both collection and CNFT images.");
            }

            setIsUploading(true);
            if (!wallet) {
                console.error("Wallet not connected");
                return;
            }

            const metadata = {
                name: nftName,
                symbol: nftSymbol,
                description: nftDescription,
                image: cnftPreview, // IPFS link
                collection_image: collectionPreview, // optional
                attributes: [],
                properties: {},
            }
            const metadataUrl = await uploadMetadataToPinata(metadata);
            const platformWalletAddress = process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS!;
            console.log(metadata);
            const result = await createCnft(
                wallet.adapter,
                metadataUrl,
                platformWalletAddress
            );
            toast("CNFT minted successfully!", {
                description: "Your CNFT has been minted successfully.",
                action: {
                    label: "Close",
                    onClick: () => console.log("Closed"),
                }
            })
            console.log("CNFT Minted:", result);
            const { collectionMint, merkleTree, collectionMetadata, collectionMasterEdition } = result;
            const data = await createDrop({
                metadata_url: metadataUrl,
                collection_mint: collectionMint.toString(),
                merkle_tree: merkleTree.toString(),
                creator_address: publicKey.toString(),
                collection_metadata: collectionMetadata.toString(),
                collection_master_edition: collectionMasterEdition.toString(),
                name: nftName,
            });
            if (!data) {
                toast.error("Drop creation failed");
                return;
            } else {
                toast.success("Drop created successfully!");
                console.log(data);
            }
            const linkToClaim = `${window.location.origin}/claim/${data.id}`;
            setClaimLink(linkToClaim);
        } catch (error) {
            console.error("Minting error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const {
        getRootProps: getRootCollectionProps,
        getInputProps: getInputCollectionProps,
    } = useDropzone({
        onDrop: onDropCollection,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    const {
        getRootProps: getRootCnftProps,
        getInputProps: getInputCnftProps,
    } = useDropzone({
        onDrop: onDropCnft,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    return (
        <div>
            <h1 className="text-7xl font-bold px-6 text-center my-16 mb-6 bg-gradient-to-r from-violet-500 to-indigo-500 text-transparent bg-clip-text py-2 ">
                Creator Dashboard
            </h1>
            <div className="max-w-4xl mx-auto  my-16">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    {/* Image upload section */}
                    <div className="space-y-6 ">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Upload Collection Image</h2>
                            <div
                                {...getRootCollectionProps()}
                                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                            >
                                <input {...getInputCollectionProps()} />
                                {collectionPreview ? (
                                    <Image
                                        src={collectionPreview}
                                        alt="Collection Preview"
                                        className="w-full h-48 object-contain rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-500">Drag & drop or click to select</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">Upload CNFT Image</h2>
                            <div
                                {...getRootCnftProps()}
                                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                            >
                                <input {...getInputCnftProps()} />
                                {cnftPreview ? (
                                    <Image
                                        src={cnftPreview}
                                        alt="CNFT Preview"
                                        className="w-full h-48 object-contain rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-500">Drag & drop or click to select</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form + Mint */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="NFT Name"
                            value={nftName}
                            onChange={(e) => setNftName(e.target.value)}
                            className="w-full p-3 border rounded-lg text-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/5 backdrop-blur-sm"
                        />
                        <input
                            type="text"
                            placeholder="NFT Symbol"
                            value={nftSymbol}
                            onChange={(e) => setNftSymbol(e.target.value)}
                            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/5 backdrop-blur-sm"
                        />
                        <textarea
                            placeholder="NFT Description"
                            value={nftDescription}
                            onChange={(e) => setNftDescription(e.target.value)}
                            className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/5 backdrop-blur-sm h-32"
                        />
                        <button
                            onClick={mintCNFT}
                            disabled={isUploading || !collectionPreview || !cnftPreview}
                            className={`w-full bg-gradient-to-r  from-violet-500 to-indigo-500 text-white p-3 rounded-lg transition-all duration-300 ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:from-violet-600 hover:to-indigo-600"
                                }`}
                        >
                            {isUploading ? "Minting CNFT..." : "Mint CNFT"}
                        </button>
                    </div>
                </div>
                {claimLink && (
                    <div className="mt-4 p-4 bg-green-100 rounded">
                        <p>🎉 Drop created successfully!</p>
                        <p>
                            Share this claim link:{" "}
                            <a href={claimLink} target="_blank" className="text-blue-600 underline">
                                {claimLink}
                            </a>
                        </p>
                        <button onClick={() => navigator.clipboard.writeText(claimLink)}>
                            📋 Copy Link
                        </button>
                    </div>
                )}

            </div></div>
    );
}
