import CopyField from "@/components/copy-field";
import { Separator } from "./ui/separator";
import { useGetAllTransferOffers } from "@/hooks/useGetAllTransferOffers";
import { useEffect } from "react";
import useTokenStore from "@/hooks/store/useTokenStore";

type TransferProps = {
  address: string;
};

function Transfer({ address }: TransferProps) {
  const { tokenIds, loading } = useTokenStore((state) => ({
    tokenIds: state.tokenIds,
    loading: state.loading,
  }));

  const { data, isLoading, refetch } = useGetAllTransferOffers(address);

  const allFetched = Object.values(loading).every((isLoading) => isLoading);

  useEffect(() => {
    if (tokenIds.length > 0 && allFetched) {
      console.log("All fetched: ", allFetched, address);
      refetch();
    }
  }, [tokenIds]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex max-w-80 flex-col gap-2">
      {data !== undefined && data !== null && data.length > 0
        ? data.map((transfer) => (
            <div>
              {transfer != null && transfer.offers.length > 0 && (
                <CopyField text="NFT Token ID: " content={transfer.nft_id} />
              )}
              {transfer.offers.map((offer) => (
                <div
                  className="flex flex-col gap-2"
                  key={offer.nft_offer_index}
                >
                  <p className="truncate">Amount: {offer.amount}</p>
                  <CopyField
                    text="Offer Index: "
                    content={offer.nft_offer_index}
                  />
                  <CopyField text="Destination: " content={offer.destination} />
                  <CopyField text="Owner: " content={offer.owner} />
                  <Separator />
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
}

export default Transfer;
