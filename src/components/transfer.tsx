import CopyField from "@/components/copy-field";
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
        <CopyField text="NFT Token ID: " content={transfer.nft_id} />
      )}
      {transfer != null && transfer.offers.length > 0
        ? transfer.offers.map((offer, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <p className="truncate">Amount: {offer.amount}</p>
              <CopyField text="Offer Index: " content={offer.nft_offer_index} />
              <CopyField text="Destination: " content={offer.destination} />
              <CopyField text="Owner: " content={offer.owner} />
              <p className="w-full border-b border-zinc-700" />
            </div>
          ))
        : null}
    </div>
  );
}

export default Transfer;
