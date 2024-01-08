import Uri from "@/components/uri";
import { useEffect, useState } from "react";

type NFTProps = {
  address?: string;
};

type NFT = {
  NFTokenID: string;
  Issuer: string;
  URI: string;
  decodedUri?: string;
};

type NFTs = NFT[];

function NFTs({ address }: NFTProps) {
  const [nfts, setNfts] = useState<NFTs>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/xrp/nfts/${address}`,
          {
            method: "GET",
          },
        );

        const data = await response.json();
        if (data.status !== "OK") {
          throw new Error("Error fetching NFTs");
        }
        setNfts(data.value.result.account_nfts);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, [address]);

  return (
    <div className="flex flex-col gap-2">
      {nfts.map((nft, index) => (
        <div className="flex max-w-80 flex-col gap-2" key={index}>
          <p className="truncate">Token ID: {nft.NFTokenID}</p>
          <Uri uri={nft.URI} />
          <p className="truncate">Issuer: {nft.Issuer}</p>
          <p className="w-full border-b border-zinc-700" />
        </div>
      ))}
    </div>
  );
}

export default NFTs;
