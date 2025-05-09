"use client";

import { useEffect, useState, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useParams } from "next/navigation";
import { claimCnfts } from "@/lib/claims";

export default function ClaimPage() {
  const { wallet, connected, publicKey } = useWallet();
  const params = useParams();
  const dropId = params?.dropId as string;

  const [dropInfo, setDropInfo] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchDropInfo = async () => {
      const res = await fetch(`/api/claim/${dropId}/info`);
      const data = await res.json();
      setDropInfo(data);

      const metadataRes = await fetch(data.metadataUrl);
      const metadataJson = await metadataRes.json();
      console.log(metadataJson);
      setMetadata(metadataJson);
    };

    if (dropId) fetchDropInfo();
  }, [dropId]);

  const handleClaim = async () => {
    if (!wallet || !dropInfo || !metadata) return;
    setLoading(true);
    const res = await fetch(`/api/claim/${dropId}`, {
      method: "POST",
      body: JSON.stringify({
        recipient: publicKey!.toString(),
        merkle_tree: dropInfo.merkleTree,
        collectionMint: dropInfo.collectionMint,
        collectionmetadata: dropInfo.collectionMetadata,
        metadataUrl: dropInfo.metadataUrl,
        collectionMasterEdition: dropInfo.collectionMasterEdition,
        creator_address: dropInfo.creatorAddress,
      }),
    }).then((res) => res.json());
    console.log(res);
    if (res) {
      setResult({
        success: true,
      });

    } else {
      setResult({ success: false, error: "Error occurred during claim" });
      setLoading(false)

    };
  };



  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Claim Your cNFT</h1>

      {!connected && (
        <p className="text-red-500">Please connect your wallet first.</p>
      )}

      {metadata && (
        <div className="border p-4 rounded shadow mb-4">
          <img src={metadata.image} alt="NFT" className="w-48 h-48 object-cover rounded" />
          <h2 className="text-xl mt-2">{metadata.name}</h2>
          <p>{metadata.description}</p>
        </div>
      )}

      <button
        disabled={!connected || loading}
        onClick={handleClaim}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Minting..." : "Claim Now"}
      </button>

      {result && (
        <div className="mt-4">
          {result.success ? (
            <p className="text-green-600">
              ✅ Success! Tx Signature:{" "}
              <a
                href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                View on Solana Explorer
              </a>
            </p>
          ) : (
            <p className="text-red-600">❌ Error:</p>
          )}
        </div>
      )}
    </div>
  );

}
