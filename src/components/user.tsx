import NFTs from "@/components/nfts";
import Transfer from "@/components/transfer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransferOffer } from "@/layout/home";
import { useState } from "react";

type UserProps = {
  name: string;
  mint?: boolean;
  seed: string;
  address: string;
  setTransferOffer: (transferOffers: TransferOffer) => void;
  refreshTransferOffer: (transferOffers: TransferOffer) => void;
  transferOffer: TransferOffer;
  destination: string;
  refreshNfts: boolean;
  setRefreshNfts: (refreshNfts: boolean) => void;
};

export type NFT = {
  NFTokenID: string;
  Issuer: string;
  URI: string;
  decodedUri?: string;
};

export type NFTs = NFT[];

function User({
  name,
  mint,
  seed,
  address,
  destination,
  transferOffer,
  setTransferOffer,
  refreshTransferOffer,
  refreshNfts,
  setRefreshNfts,
}: UserProps) {
  const [nfts, setNfts] = useState<NFTs>([]);
  // const [refreshTransferOffers, setRefreshTransferOffers] =
  // useState<boolean>(false);

  const mintNFT = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/mint`,
        {
          method: "POST",
          body: JSON.stringify({
            address: address,
            seed: seed,
            uri: "testUri123",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error minting NFT");
      }
      setRefreshNfts(!refreshNfts);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const createTransferOffer = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/create`,
        {
          method: "POST",
          body: JSON.stringify({
            address: address,
            seed: seed,
            tokenId: nfts[0].NFTokenID,
            amount: "0",
            destination: destination,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error creating sell offer");
      }
      getTransferOffers(nfts[0].NFTokenID);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTransferOffers = async (tokenId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/${tokenId}`,
        {
          method: "GET",
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error fetching sell offers");
      }

      setTransferOffer(data.value.result);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const acceptTransferOffer = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/accept`,
        {
          method: "POST",
          body: JSON.stringify({
            address: address,
            seed: seed,
            sellOffer: transferOffer.offers[0].nft_offer_index,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error accepting sell offer");
      }
      setRefreshNfts(!refreshNfts);

      const newTransferOffer: TransferOffer = {
        ...transferOffer,
        nft_id: "",
        offers: [],
      };

      refreshTransferOffer(newTransferOffer);
      // refreshTransferOffer((prev: TransferOffer) => ({
      //   ...prev,
      //   nft_id: "",
      //   offers: [],
      // }));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="text-md flex w-full flex-col items-center justify-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>Address: {address}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-around">
          {mint && (
            <Button variant="outline" onClick={mintNFT}>
              Mint
            </Button>
          )}
          <Button variant="outline" onClick={createTransferOffer}>
            Transfer
          </Button>
          <Button variant="outline" onClick={acceptTransferOffer}>
            Accept
          </Button>
        </CardContent>
      </Card>
      <div className="flex gap-6"></div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{name}'s Owned NFTs</CardTitle>
          <CardDescription>List of {name}'s Owned NFTs</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="flex h-80 flex-col">
            {address && (
              <NFTs
                address={address}
                mintClicked={refreshNfts}
                nfts={nfts}
                setNfts={setNfts}
              />
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{name}'s Transfer Offers</CardTitle>
            <CardDescription>List of {name}'s Transfer Offers</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="flex h-80 flex-col gap-2">
              <Transfer transfer={transferOffer} />
            </ScrollArea>
            {/* 
            {transferOffers.map((transferOffer, index) => (
              <Transfer transfer={transferOffer} key={index} />
            ))} */}
          </CardContent>
        </Card>
        {/* <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Buy Offers</CardTitle>
            <CardDescription>List of Buy Offers</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-40 flex-col gap-2">
            <div>Buy Offer 1</div>
            <div>Buy Offer 2</div>
            <div>Buy Offer 3</div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

export default User;
