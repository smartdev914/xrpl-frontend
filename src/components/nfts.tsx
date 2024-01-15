import Uri from "@/components/uri";
import CopyField from "@/components/copy-field";
import { Separator } from "./ui/separator";
import { useGetNfts } from "@/hooks/useGetNfts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useSelectedNFTStore from "@/hooks/store/useSelectedNFTStore";
// import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type NFTProps = {
  address: string;
};

function NFTs({ address }: NFTProps) {
  const { isPending, isError, data, error } = useGetNfts(address);
  const { setSelectedNFT } = useSelectedNFTStore((state) => ({
    // selectedNFT: state.selectedNFT,
    setSelectedNFT: state.setSelectedNFT,
  }));

  // useEffect(() => {
  //   if (data && data.length > 0 && selectedNFT[address] === undefined) {
  //     setSelectedNFT(address, data[0].NFTokenID);
  //   }
  // }, [data, address, selectedNFT, setSelectedNFT]);

  if (isPending) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-4" rounded-full />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
    );
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {data !== undefined && data !== null && data.length > 0 && (
        <RadioGroup
          // defaultValue={data[0].NFTokenID}
          // value={selectedNFT[address]}
          onValueChange={(e) => {
            setSelectedNFT(address, e);
          }}
        >
          {data.map(
            (nft: { NFTokenID: string; URI: string; Issuer: string }) => (
              <div className="flex items-center gap-4" key={nft.NFTokenID}>
                <RadioGroupItem value={nft.NFTokenID} id={nft.NFTokenID} />
                <Label htmlFor={nft.NFTokenID} className="flex flex-col gap-2">
                  <CopyField text="Token ID: " content={nft.NFTokenID} />
                  <Uri uri={nft.URI} />
                  <CopyField text="Issuer: " content={nft.Issuer} />
                  <Separator />
                </Label>
              </div>
            ),
          )}
        </RadioGroup>
      )}
    </div>
  );
}

export default NFTs;
