import User from "@/components/user";
import { useState } from "react";

export type Offer = {
  amount: string;
  destination: string;
  flags: string;
  nft_offer_index: string;
  owner: string;
};

export type TransferOffer = {
  nft_id: string;
  offers: Offer[];
};

export type TransferOffers = TransferOffer[];

function Home() {
  const [refreshNfts, setRefreshNfts] = useState<boolean>(false);
  const [platformTransferOffers, setPlatformTransferOffers] =
    useState<TransferOffer>({ nft_id: "", offers: [] });
  const [aTransferOffers, setATransferOffers] = useState<TransferOffer>({
    nft_id: "",
    offers: [],
  });
  const [bTransferOffers, setBTransferOffers] = useState<TransferOffer>({
    nft_id: "",
    offers: [],
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-7xl justify-between gap-4">
        <User
          name="Platform"
          mint
          seed={import.meta.env.VITE_PLATFORM_SEED}
          address={import.meta.env.VITE_PLATFORM_ADDRESS}
          setTransferOffer={setATransferOffers}
          refreshTransferOffer={setPlatformTransferOffers}
          transferOffer={platformTransferOffers}
          destination={import.meta.env.VITE_A_ADDRESS}
          refreshNfts={refreshNfts}
          setRefreshNfts={setRefreshNfts}
        />
        <User
          name="User A"
          seed={import.meta.env.VITE_A_SEED}
          address={import.meta.env.VITE_A_ADDRESS}
          setTransferOffer={setBTransferOffers}
          refreshTransferOffer={setATransferOffers}
          transferOffer={aTransferOffers}
          destination={import.meta.env.VITE_B_ADDRESS}
          refreshNfts={refreshNfts}
          setRefreshNfts={setRefreshNfts}
        />
        <User
          name="User B"
          seed={import.meta.env.VITE_B_SEED}
          address={import.meta.env.VITE_B_ADDRESS}
          setTransferOffer={setPlatformTransferOffers}
          refreshTransferOffer={setBTransferOffers}
          transferOffer={bTransferOffers}
          destination={import.meta.env.VITE_PLATFORM_ADDRESS}
          refreshNfts={refreshNfts}
          setRefreshNfts={setRefreshNfts}
        />
      </div>
    </main>
  );
}

export default Home;
