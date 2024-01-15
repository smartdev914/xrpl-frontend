import CopyField from "@/components/copy-field";
import { Separator } from "./ui/separator";
import { useGetAllTransferOffers } from "@/hooks/useGetAllTransferOffers";
import { useCallback, useEffect } from "react";
import useTokenStore from "@/hooks/store/useTokenStore";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenStore } from "@/hooks/store/useTokenStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSelectedTransferStore from "@/hooks/store/useSelectedTransferStore";

type TransferProps = {
  address: string;
};

function Transfer({ address }: TransferProps) {
  const { setSelectedTransfer } = useSelectedTransferStore((state) => ({
    setSelectedTransfer: state.setSelectedTransfer,
  }));

  const selectTokenStore = useCallback(
    (state: TokenStore) => ({
      tokenIds: state.tokenIds,
      loading: state.loading,
    }),
    [],
  );

  const { tokenIds, loading } = useTokenStore(selectTokenStore);

  const { data, isLoading, refetch } = useGetAllTransferOffers(address);

  const allFetched = Object.values(loading).every((isLoading) => isLoading);

  useEffect(() => {
    if (tokenIds.length > 0 && allFetched && !isLoading) {
      refetch();
    }
  }, [tokenIds, loading]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-4" rounded-full />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
    );
  }

  if (data === undefined || data === null || data.length === 0) {
    return <></>;
  }

  return (
    <div className="flex max-w-72 flex-col gap-2">
      {data.map((transfer) => (
        <RadioGroup
          onValueChange={(e) => {
            setSelectedTransfer(address, e);
          }}
        >
          <div className="flex items-center gap-4 text-sm">
            <RadioGroupItem value={transfer.nft_id} id={transfer.nft_id} />
            <div className="flex flex-col gap-2">
              <CopyField text="NFT Token ID: " content={transfer.nft_id} />
              {transfer.offers.map((offer) => (
                <div className="flex flex-col gap-2">
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
          </div>
        </RadioGroup>
      ))}
    </div>
  );
}

export default Transfer;
