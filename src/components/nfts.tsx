import Uri from "@/components/uri";
import { useEffect } from "react";
import { NFTs as NFTsType } from "@/components/user";
import CopyField from "@/components/copy-field";

type NFTProps = {
  address?: string;
  mintClicked?: boolean;
  nfts: NFTsType;
  setNfts: (nfts: NFTsType) => void;
};

function NFTs({ address, mintClicked, nfts, setNfts }: NFTProps) {
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
  }, [address, mintClicked, setNfts]);

  return (
    <div className="flex flex-col gap-2">
      {nfts.map((nft, index) => (
        <div className="flex max-w-80 flex-col gap-2" key={index}>
          <CopyField text="Token ID: " content={nft.NFTokenID} />
          <Uri uri={nft.URI} />
          <CopyField text="Issuer: " content={nft.Issuer} />
          <p className="w-full border-b border-zinc-700" />
        </div>
      ))}
    </div>
  );
}

export default NFTs;
