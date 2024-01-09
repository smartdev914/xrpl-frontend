import { Offer } from "@/layout/home";

type TransferProps = {
  transfer: {
    nft_id: string;
    offers: Offer[];
  };
};

function Transfer({ transfer }: TransferProps) {
  return (
    <div className="flex max-w-80 flex-col gap-2">
      {transfer != null && transfer.offers.length > 0 && (
        <p className="truncate">NFT Token ID: {transfer.nft_id}</p>
      )}
      {transfer != null && transfer.offers.length > 0
        ? transfer.offers.map((offer, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <p className="truncate">Amount: {offer.amount}</p>
              <p className="truncate">Offer Index: {offer.nft_offer_index}</p>
              <p className="truncate">Destination: {offer.destination}</p>
              <p className="truncate">Owner: {offer.owner}</p>
              <p className="w-full border-b border-zinc-700" />
            </div>
          ))
        : null}
    </div>
  );
}

export default Transfer;
